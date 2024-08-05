import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, IconButton, InputAdornment, Modal as MuiModal } from '@mui/material';
import ExposicionesService from '../../../services/shared/Exposiciones.service.js';
import { Add as AddIcon, Delete as DeleteIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const ExpositionForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        id: null,
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        obras: [],
        imagen: null,
    });
    const [availableArts, setAvailableArts] = useState([]);
    const [newArtModalOpen, setNewArtModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                imagen: 'same',
            });
            fetchAvailableArts(initialData.id);
        } else {
            fetchAvailableArts(-1);
        }
    }, [initialData]);

    const fetchAvailableArts = async (id) => {
        try {
            const response = await ExposicionesService.getAvailableArts(id);
            setAvailableArts(response);
        } catch (error) {
            console.error('Error fetching available arts:', error);
            setAvailableArts([]);
        }
    };

    const fetchAvailableArtsWithDelay = async () => {
        setLoading(true);
        await fetchAvailableArts(formData.id || -1);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Espera de 2 segundos para revivirlo
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imagen: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setFormData({
            ...formData,
            imagen: '',
        });
    };

    const handleItemChange = (e, name, index) => {
        const { value } = e.target;
        const updatedItems = [...formData[name]];
        updatedItems[index] = value;
        setFormData({
            ...formData,
            [name]: updatedItems,
        });
    };

    const handleRemoveItem = (name, index) => {
        const updatedItems = [...formData[name]];
        updatedItems.splice(index, 1);
        setFormData({
            ...formData,
            [name]: updatedItems,
        });
    };

    const handleAddItem = (name) => {
        const updatedItems = [...formData[name], ''];
        setFormData({
            ...formData,
            [name]: updatedItems,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const openNewArtLink = () => {
        window.open('/admin/art', '_blank');
    };

    const isItemSelected = (name, id) => {
        return formData[name].includes(id);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <TextField
                label="Fecha de Inicio"
                name="fecha_inicio"
                type="date"
                value={formData.fecha_inicio}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Fecha de Fin"
                name="fecha_fin"
                type="date"
                value={formData.fecha_fin}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div>
                <div className="flex justify-between">
                    <label>Obras</label>
                    <div>
                        <IconButton onClick={fetchAvailableArtsWithDelay} color="primary" disabled={loading}>
                            <RefreshIcon />
                        </IconButton>
                        <IconButton onClick={() => openNewArtLink()}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </div>
                {Array.isArray(formData.obras) && formData.obras.map((obra, index) => (
                    <div key={index} className="flex items-center">
                        <FormControl fullWidth margin="normal">
                            <InputLabel id={`obras-label-${index}`}>Obras</InputLabel>
                            <Select
                                labelId={`obras-label-${index}`}
                                value={obra}
                                onChange={(e) => handleItemChange(e, 'obras', index)}
                                fullWidth
                            >
                                <MenuItem value={-1}>Selecciona una opción</MenuItem>
                                {availableArts.map(art => (
                                    <MenuItem
                                        key={art.id}
                                        value={art.id}
                                        disabled={isItemSelected('obras', art.id)}
                                    >
                                        {art.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleRemoveItem('obras', index)}>
                                <DeleteIcon />
                            </IconButton>
                        </InputAdornment>
                    </div>
                ))}
                <div className="flex justify-between items-center mt-2">
                    <IconButton onClick={() => handleAddItem('obras')}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <div style={{ margin: '10px 0' }}>
                <label>Imagen</label>
                <br />
                {formData.imagen && formData.imagen !== 'same' && (
                    <div className="flex border rounded" style={{ position: 'relative', margin: '10px 0' }}>
                        <img
                            src={formData.imagen}
                            alt="Imagen"
                            style={{ width: '50%', height: 'auto', display: 'block' }}
                            className="rounded"
                        />
                        <div className="w-1/2 grid place-items-center">
                            <IconButton
                                onClick={handleImageRemove}
                                style={{ color: 'red', width: '20%' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'block', marginTop: '10px' }}
                />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Guardar
            </Button>

            {/* Modal for new art */}

        </Box>
    );
};

export default ExpositionForm;