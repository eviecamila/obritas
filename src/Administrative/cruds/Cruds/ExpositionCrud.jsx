import React, { useState, useEffect } from 'react';
import ExposicionesService from '../../../services/shared/Exposiciones.service.js';
import ExpositionForm from '../Forms/ExpositionForm.jsx';
import GenericTable from '../Generic/Table.jsx';
import { Typography, IconButton, TextField, InputAdornment, Modal, Box } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

const expositionColumns = [
    { Header: 'Nombre', accessor: 'nombre' },
    { Header: 'Descripción', accessor: 'descripcion' },
    { Header: 'Fecha de Inicio', accessor: 'fecha_inicio' },
    { Header: 'Fecha de Fin', accessor: 'fecha_fin' },
    { Header: 'Obras', accessor: 'obras', render: (value) => value ? value.map(o => o.titulo).join(', ') : 'Ninguna' },
    { Header: 'Imagen', accessor: 'imagen', render: (value) => value ? <img src={value} alt="Imagen de la exposición" style={{ width: '50px' }} /> : 'No disponible' },
];

const ExpositionCrud = () => {
    const [entities, setEntities] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingEntity, setEditingEntity] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchEntities();
    }, [page, searchTerm]);

    const fetchEntities = () => {
        ExposicionesService.getAll({ skip: (page - 1) * 10, limit: 10, searchTerm, d: 0 }).then(response => {
            const exposiciones = response.data.exposiciones;
            const obras = response.data.obras.obras;

            const updatedEntities = Object.values(exposiciones).map(expo => ({
                ...expo,
                obras: expo.obras.map(obraId => obras.find(obra => obra.id === obraId))
            }));

            setEntities(updatedEntities);
            setTotalPages(response.pages);
        }).catch(error => {
            console.error('Error fetching entities:', error);
        });
    };

    const handleCreate = () => {
        setIsEditing(false);
        setIsCreating(true);
        setEditingEntity(null);
    };

    const handleEdit = (entityId) => {
        setIsEditing(true);
        ExposicionesService.getById(entityId, { edit: 1 }).then(response => {
            setEditingEntity(response);
            setIsCreating(true);
        }).catch(error => {
            console.error('Error fetching exposition for edit:', error);
        });
    };

    const handleCloseForm = () => {
        setIsCreating(false);
        setEditingEntity(null);
        fetchEntities();
    };

    const handleSubmit = (formData) => {
        const action = editingEntity
            ? ExposicionesService.update(editingEntity.id, formData)
            : ExposicionesService.create(formData);
        action.then(() => {
            handleCloseForm();
        }).catch(error => {
            console.error(`Error ${editingEntity ? 'updating' : 'creating'} exposition:`, error);
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(1); // Reset page when search term changes
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4 p-8">
                <h1 className="font-bold text-2xl">Exposiciones</h1>
                <div className="flex items-center">
                    <TextField
                        label="Buscar exposiciones"
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
                        {isEditing ? 'Actualizar' : 'Crear'} Exposición
                    </Typography>
                    <ExpositionForm onSubmit={handleSubmit} initialData={editingEntity} />
                </Box>
            </Modal>

            <GenericTable
                columns={expositionColumns}
                entities={entities}
                onEdit={handleEdit}
                onDelete={(id) => ExposicionesService.delete(id).then(fetchEntities).catch(console.error)}
                frontUrl='expositions'
                handleNextPage={() => handlePageChange(page + 1)}
                handlePreviousPage={() => handlePageChange(page - 1)}
                page={page}
                totalPages={totalPages}
                entityName='EXPO'
            />
        </div>
    );
};

export default ExpositionCrud;
