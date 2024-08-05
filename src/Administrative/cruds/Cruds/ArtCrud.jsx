import React, { useState, useEffect } from 'react';
import ArtService from '../../../services/shared/Obras.service.js';
import ArtForm from '../Forms/ArtForm.jsx';
import GenericTable from '../Generic/Table.jsx';
import { Typography, IconButton, TextField, InputAdornment, Modal, Box } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

const artColumns = [
    { Header: 'Título', accessor: 'titulo' },
    { Header: 'Descripción', accessor: 'descripcion' },
    { Header: 'Año', accessor: 'yr_creacion', render: (value) => value ? value.substring(0, 4) : 'N/A' },
    { Header: 'Ubicado en', accessor: 'id_proyecto' },
    { Header: 'Autores', accessor: 'autores', render: (value) => value ? value.map(a => a.nombre).join(', ') : 'Ninguno' },
    { Header: 'Estilos', accessor: 'estilos', render: (value) => value ? value.map(s => s.nombre).join(', ') : 'Ninguno' },
    { Header: 'Métodos', accessor: 'metodos', render: (value) => value ? value.map(m => m.nombre).join(', ') : 'Ninguno' },
];

const ArtCrud = () => {
    const [entities, setEntities] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchEntities();
    }, [page, searchTerm]);

    const fetchEntities = () => {
        ArtService.getAll({ skip: (page - 1) * 10, limit: 10, searchTerm, d: 1 }).then(response => {

            const authors = response.data.autores;
            const styles = response.data.estilos;
            const methods = response.data.metodos;
            const obras = response.data.obras;
            const transformedEntities = obras.map(obra => ({
                ...obra,
                autores: obra.autores.map(id => authors[id] || { nombre: 'Desconocido' }),
                estilos: obra.estilos.map(id => styles[id] || { nombre: 'Desconocido' }),
                metodos: obra.metodos.map(id => methods[id] || { nombre: 'Desconocido' })
            }));

            setEntities(transformedEntities);
            setTotalPages(response.pages || 1); // Asegúrate de que la API devuelva el número total de páginas
        }).catch(error => {
            console.error('Error fetching entities:', error);
            setEntities([]);
        });
    };

    const handleCreate = () => {
        setInitialData({});
        setIsCreating(true);
        setIsEditing(false);
    };

    const handleEdit = (id) => {
        setIsEditing(true);
        ArtService.getById(id).then(response => {
            setInitialData(response);
            setIsCreating(true);
        }).catch(error => {
            console.error('Error fetching entity for edit:', error);
        });
    };

    const handleCloseForm = () => {
        setIsCreating(false);
        setInitialData({});
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(1); // Resetear la página cuando se cambia la búsqueda
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const submit = (data) => {
        if (data.id) {
            ArtService.update(data.id, data).then(() => {
                fetchEntities();
                handleCloseForm();
            }).catch(error => {
                console.error('Error updating entity:', error);
            });
        } else {
            ArtService.create(data).then(() => {
                fetchEntities();
                handleCloseForm();
            }).catch(error => {
                console.error('Error creating entity:', error);
            });
        }
    };

    const handleDelete = (id) => {
        ArtService.delete(id).then(() => {
            fetchEntities();
        }).catch(error => {
            console.error('Error deleting entity:', error);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4 p-8">
                <h1 className="font-bold text-2xl">Obras de Arte</h1>
                <div className="flex items-center">
                    <TextField
                        label="Buscar obras"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={handleCreate} color="primary">
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <Modal
                open={isCreating}
                onClose={handleCloseForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {isEditing ? 'Actualizar' : 'Crear'} Obra
                    </Typography>
                    <ArtForm onSubmit={submit} initialData={initialData} />
                </Box>
            </Modal>

            <GenericTable
                columns={artColumns}
                entities={entities}
                onEdit={handleEdit}
                onDelete={handleDelete}
                frontUrl='art'
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                page={page}
                totalPages={totalPages}
                entityName='OBRA'
            />
        </div>
    );
};

export default ArtCrud;
