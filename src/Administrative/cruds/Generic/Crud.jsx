import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const GenericCrud = ({ entities: initialEntities, entityService, entityForm: EntityForm, entityTable: EntityTable, entity }) => {
    const [entities, setEntities] = useState(initialEntities);
    const [editingEntity, setEditingEntity] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [entityToDelete, setEntityToDelete] = useState(null);

    useEffect(() => {
        setEntities(initialEntities);
    }, [initialEntities]);

    const handleEdit = (id) => {
        entityService.getById(id).then(response => {
            setEditingEntity(response);
            setShowEditModal(true);
        });
    };

    const handleDelete = (id) => {
        setEntityToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        entityService.delete(entityToDelete).then(() => {
            setEntities(entities.filter(entity => entity.id !== entityToDelete));
            setShowDeleteModal(false);
            setEntityToDelete(null);
        });
    };

    const handleSubmit = (entity) => {
        if (editingEntity) {
            entityService.update(editingEntity.id, entity).then(response => {
                setEntities(entities.map(e => (e.id === editingEntity.id ? response : e)));
                setEditingEntity(null);
                setShowEditModal(false);
            });
        } else {
            entityService.create(entity).then(response => {
                setEntities([...entities, response]);
                setShowEditModal(false);
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <EntityTable entities={entities} onEdit={handleEdit} onDelete={handleDelete} />
            <Modal
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
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
                        {`Editar ${entity.name} ${entity.name2}`}
                    </Typography>
                    <EntityForm initialData={editingEntity} onSubmit={handleSubmit} />
                </Box>
            </Modal>
            <Modal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
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
                        {`Eliminar ${entity.name}`}
                    </Typography>
                    <Typography id="modal-modal-description">
                        {`¿Estás seguro de eliminar est${entity.gender === 'a' ? 'a' : 'e'} ${entity.name}${entity.name2 ? ' ' + entity.name2 : ''}?`}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" onClick={confirmDelete}>
                            Yes
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => setShowDeleteModal(false)}>
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default GenericCrud;
