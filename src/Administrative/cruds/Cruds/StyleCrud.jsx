import React, { useState, useEffect } from 'react';
import GenericCrud from '../Generic/Crud.jsx';
import EstilosService from '../../../services/shared/Estilos.service.js';
import StyleForm from '../Forms/StyleForm.jsx';
import GenericTable from '../Generic/Table.jsx';
import {Typography, IconButton, TextField, InputAdornment, Modal, Box } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

const styleColumns = [
    { Header: 'Nombre', accessor: 'nombre' },
    { Header: 'Descripción', accessor: 'descripcion' },
    { Header: 'Imagen', accessor: 'imagen', render: (value) => <img src={value} alt="Imagen" width="50" /> },
];

const StyleCrud = () => {
    const [entities, setEntities] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEntities();
    }, []);

    const fetchEntities = () => {
        EstilosService.getAll(0, 1).then(response => {
            setEntities(response);
        }).catch(error => {
            console.error('Error fetching entities:', error);
            setEntities([]);
        });
    };

    const handleCreate = () => {
        setInitialData({});
        setIsCreating(true);
    };

    const handleEdit = (id) => {
        EstilosService.getById(id).then(response => {
            setInitialData(response);
            setIsCreating(true);
        }).catch(error => {
            console.error('Error fetching entity for edit:', error);
        });
    };

    const submit = (data) => {
        if (data.id) { // Update if ID is present
            EstilosService.update(data.id, data).then(() => {
                fetchEntities(); // Fetch entities after update
                handleCloseForm(); // Close the form
            }).catch(error => {
                console.error('Error updating entity:', error);
            });
        } else { // Create if no ID is present
            EstilosService.create(data).then(() => {
                fetchEntities(); // Fetch entities after creation
                handleCloseForm(); // Close the form
            }).catch(error => {
                console.error('Error creating entity:', error);
            });
        }
    };

    const handleCloseForm = () => {
        setIsCreating(false);
        setInitialData({});
    };

    const handleDelete = (id) => {
        EstilosService.delete(id).then(() => {
            fetchEntities(); // Refresh the list after deletion
        }).catch(error => {
            console.error('Error deleting entity:', error);
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEntities = (entities || []).filter(entity =>
        entity.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-4 p-8">
                <h1 className="font-bold text-2xl">Estilos Artísticos</h1>
                <div className="flex items-center">
                    <TextField
                        label="Buscar estilos"
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
                        Crear/Actualizar Estilo
                    </Typography>
                    <StyleForm
                        onSubmit={submit}
                        initialData={initialData}
                        creating={!initialData.id}
                    />
                </Box>
            </Modal>

            <GenericCrud
                entities={filteredEntities}
                entityService={EstilosService}
                entityForm={props => <StyleForm {...props} initialData={initialData} />}
                entityTable={props => (
                    <GenericTable
                        {...props}
                        columns={styleColumns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        url="styles"
                        entityName='ESTILO'
                    />
                )}
                entity={{ gender: 'o', name: 'Estilo Artístico', name2: '' }}
            />
        </div>
    );
};

export default StyleCrud;
