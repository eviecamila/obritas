import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, IconButton, Box, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const GenericForm = ({ initialData, onSubmit, fields }) => {
    const [entity, setEntity] = useState(initialData || {});

    useEffect(() => {
        if (initialData) {
            setEntity(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntity(prevEntity => ({ ...prevEntity, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEntity(prevEntity => ({ ...prevEntity, imagen: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEntity(prevEntity => ({ ...prevEntity, [name]: checked }));
    };

    const handleImageRemove = () => {
        setEntity(prevEntity => ({ ...prevEntity, imagen: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(entity);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            {fields.map((field) => (
                field.type === 'checkbox' ? (
                    <FormControlLabel
                        key={field.name}
                        control={
                            <Checkbox
                                checked={!!entity[field.name]}
                                onChange={handleCheckboxChange}
                                name={field.name}
                                color="primary"
                            />
                        }
                        label={field.label}
                    />
                ) : field.type === 'file' ? (
                    <Box key={field.name} sx={{ my: 2 }}>
                        <Typography variant="subtitle1">{field.label}</Typography>
                        {entity[field.name] && (
                            <Box sx={{ display: 'flex', border: 1, borderRadius: 1, overflow: 'hidden', my: 2 }}>
                                <img
                                    src={entity[field.name]}
                                    alt={field.label}
                                    style={{ width: '50%', height: 'auto', display: 'block' }}
                                />
                                <Box sx={{ display: 'grid', placeItems: 'center', width: '50%' }}>
                                    <IconButton
                                        onClick={handleImageRemove}
                                        sx={{ color: 'red' }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'block', marginTop: '10px' }}
                        />
                    </Box>
                ) : (
                    <TextField
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        value={entity[field.name] || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type={field.type || 'text'}
                        InputLabelProps={{ shrink: true }}
                        disabled={typeof field.disabled === 'function' ? field.disabled(entity) : field.disabled}
                    />
                )
            ))}
            <Button type="submit" variant="contained" color="primary">
                {initialData ? 'Actualizar' : 'Crear'}
            </Button>
        </Box>
    );
};

export default GenericForm;
