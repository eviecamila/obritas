import React, { useState, useEffect } from 'react';
import AutorService from '../../../services/shared/Autores.service.js';
import AuthorForm from '../Forms/AuthorForm.jsx';
import GenericTable from '../Generic/Table.jsx';
import {Typography, IconButton, TextField, InputAdornment, Modal, Box } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import GlobalService from 'services/shared/Global.service.jsx';

const authorColumns = [
    { Header: 'Nombre', accessor: 'nombre' },
    { Header: 'Nombre Artístico', accessor: 'nombre_artistico' },
    { Header: 'Biografía', accessor: 'biografia' },
    { Header: 'Fecha de Nacimiento', accessor: 'fecha_nacimiento', center: true },
    { Header: 'Fecha de Fallecimiento', accessor: 'fecha_fallecimiento', center: true },
    { Header: 'Imagen', accessor: 'imagen', render: (value) => <img src={GlobalService.lazyLoad(value)} alt="Imagen" style={{ minWidth: '32px' }} />, center: true },
];

const AuthorCrud = () => {
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
        AutorService.getAll({ skip: (page - 1) * 10, limit: 10, searchTerm, d: 1 }).then(response => {
            const data = Array.isArray(response.data) ? response.data : [];
            setEntities(data); // Asegurarse de que `data` es un array
            setTotalPages(response.pages || 1); // Asegúrate de que la API devuelva el número total de páginas
        }).catch(error => {
            console.error('Error fetching entities:', error);
            setEntities([]);
        });
    };

    const handleCreate = () => {
        setInitialData({});
        setIsCreating(true);
        setIsEditing(false)
    };

    const handleEdit = (id) => {
        setIsEditing(true)
        AutorService.getById(id).then(response => {
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
            AutorService.update(data.id, data).then(() => {
                fetchEntities();
                handleCloseForm();
            }).catch(error => {
                console.error('Error updating entity:', error);
            });
        } else {
            AutorService.create(data).then(() => {
                fetchEntities();
                handleCloseForm();
            }).catch(error => {
                console.error('Error creating entity:', error);
            });
        }
    };

    const handleDelete = (id) => {
        AutorService.delete(id).then(() => {
            fetchEntities();
        }).catch(error => {
            console.error('Error deleting entity:', error);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4 p-8">
                <h1 className="font-bold text-2xl">Autores</h1>
                <div className="flex items-center">
                    <TextField
                        label="Buscar autores"
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
                        {isEditing?'Actualizar':'Crear'} Autor
                    </Typography>
                    <AuthorForm onSubmit={submit} initialData={initialData} />
                </Box>
            </Modal>

            <GenericTable
                columns={authorColumns}
                entities={entities}
                onEdit={handleEdit}
                onDelete={handleDelete}
                frontUrl='authors'
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                page={page}
                totalPages={totalPages}
                entityName='AUTOR'
            />
        </div>
    );
};

export default AuthorCrud;
