import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Select, MenuItem, InputAdornment, Button, Box, Modal as MuiModal, FormControl, InputLabel } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import AuthorsService from '../../../services/shared/Autores.service';
import EstilosService from '../../../services/shared/Estilos.service';
import MetodosService from '../../../services/shared/Metodos.service';

const ArtForm = ({ initialData, onSubmit }) => {
    const [art, setArt] = useState({
        titulo: '',
        descripcion: '',
        yr_creacion: '',
        id_proyecto: '',
        autores: [],
        estilos: [],
        metodos: [],
        ...initialData,
        autores: initialData?.autores || [],
        estilos: initialData?.estilos || [],
        metodos: initialData?.metodos || []
    });

    const [authors, setAuthors] = useState([]);
    const [styles, setStyles] = useState([]);
    const [methods, setMethods] = useState([]);
    const [newAuthorModalOpen, setNewAuthorModalOpen] = useState(false);
    const [newStyleModalOpen, setNewStyleModalOpen] = useState(false);
    const [newMethodModalOpen, setNewMethodModalOpen] = useState(false);
    const [loading, setLoading] = useState({ authors: false, styles: false, methods: false });

    useEffect(() => {
        fetchData();
        if (initialData) {
            const processedInitialData = {
                ...initialData,
                autores: Array.isArray(initialData.autores) ? initialData.autores.map(Number) : Object.keys(initialData.autores).map(Number),
                estilos: Array.isArray(initialData.estilos) ? initialData.estilos.map(Number) : Object.keys(initialData.estilos).map(Number),
                metodos: Array.isArray(initialData.metodos) ? initialData.metodos.map(Number) : Object.keys(initialData.metodos).map(Number)
            };
            setArt(processedInitialData);
        }
    }, [initialData]);

    const fetchData = async () => {
        await fetchAuthors();
        await fetchStyles();
        await fetchMethods();
    };

    const fetchAuthors = async () => {
        try {
            const response = await AuthorsService.getList();
            setAuthors(response || []);
        } catch (error) {
            console.error('Error fetching authors:', error);
            setAuthors([]);
        }
    };

    const fetchStyles = async () => {
        try {
            const response = await EstilosService.getList();
            setStyles(response || []);
        } catch (error) {
            console.error('Error fetching styles:', error);
            setStyles([]);
        }
    };

    const fetchMethods = async () => {
        try {
            const response = await MetodosService.getList();
            setMethods(response || []);
        } catch (error) {
            console.error('Error fetching methods:', error);
            setMethods([]);
        }
    };

    const fetchWithDelay = async (fetchFunction, key) => {
        setLoading(prevState => ({ ...prevState, [key]: true }));
        await fetchFunction();
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(prevState => ({ ...prevState, [key]: false }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArt(prevArt => ({ ...prevArt, [name]: value }));
    };

    const handleAddItem = (field) => {
        setArt(prevArt => ({ ...prevArt, [field]: [...prevArt[field], ''] }));
    };

    const handleRemoveItem = (field, index) => {
        setArt(prevArt => {
            const newValues = prevArt[field].filter((_, i) => i !== index);
            return { ...prevArt, [field]: newValues };
        });
    };

    const handleItemChange = (e, field, index) => {
        const { value } = e.target;
        setArt(prevArt => {
            const newValues = [...prevArt[field]];
            newValues[index] = Number(value);
            return { ...prevArt, [field]: newValues };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(art);
    };

    const openNewLink = (path) => {
        window.open(path, '_blank');
    };

    const isItemSelected = (field, id) => {
        return art[field].includes(id);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                name="titulo"
                label="Título"
                value={art.titulo}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
            />
            <TextField
                name="descripcion"
                label="Descripción"
                value={art.descripcion}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
                minRows={3}
            />
            <TextField
                name="yr_creacion"
                label="Año de Creación"
                type="date"
                value={art.yr_creacion}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                name="id_proyecto"
                label="Ubicado en"
                value={art.id_proyecto}
                onChange={handleChange}
                fullWidth
                multiline
                margin="normal"
            />
            <div>
                <div className="flex justify-between">
                    <label>Autores</label>
                    <div>
                        <IconButton onClick={() => fetchWithDelay(fetchAuthors, 'authors')} color="primary" disabled={loading.authors}>
                            <RefreshIcon />
                        </IconButton>
                        <IconButton onClick={() => openNewLink('/admin/authors')}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </div>
                {Array.isArray(art.autores) && art.autores.map((autor, index) => (
                    <div key={index} className="flex items-center">
                        <FormControl fullWidth margin="normal">
                            <InputLabel id={`autores-label-${index}`}>Autores</InputLabel>
                            <Select
                                labelId={`autores-label-${index}`}
                                value={autor}
                                onChange={(e) => handleItemChange(e, 'autores', index)}
                                fullWidth
                            >
                                <MenuItem value={-1}>Selecciona una opción</MenuItem>
                                {authors.map(author => (
                                    <MenuItem
                                        key={author.id}
                                        value={author.id}
                                        disabled={isItemSelected('autores', author.id)}
                                    >
                                        {author.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleRemoveItem('autores', index)}>
                                <DeleteIcon />
                            </IconButton>
                        </InputAdornment>
                    </div>
                ))}
                <div className="w-full text-end">
                    <IconButton onClick={() => handleAddItem('autores')}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <label>Estilos</label>
                    <div>
                        <IconButton onClick={() => fetchWithDelay(fetchStyles, 'styles')} color="primary" disabled={loading.styles}>
                            <RefreshIcon />
                        </IconButton>
                        <IconButton onClick={() => openNewLink('/admin/styles')}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </div>
                {Array.isArray(art.estilos) && art.estilos.map((estilo, index) => (
                    <div key={index} className="flex items-center">
                        <FormControl fullWidth margin="normal">
                            <InputLabel id={`estilos-label-${index}`}>Estilos</InputLabel>
                            <Select
                                labelId={`estilos-label-${index}`}
                                value={estilo}
                                onChange={(e) => handleItemChange(e, 'estilos', index)}
                                fullWidth
                            >
                                <MenuItem value={-1}>Selecciona una opción</MenuItem>
                                {styles.map(style => (
                                    <MenuItem
                                        key={style.id}
                                        value={style.id}
                                        disabled={isItemSelected('estilos', style.id)}
                                    >
                                        {style.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleRemoveItem('estilos', index)}>
                                <DeleteIcon />
                            </IconButton>
                        </InputAdornment>
                    </div>
                ))}
                <div className="w-full text-end">
                    <IconButton onClick={() => handleAddItem('estilos')}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <label>Métodos</label>
                    <div>
                        <IconButton onClick={() => fetchWithDelay(fetchMethods, 'methods')} color="primary" disabled={loading.methods}>
                            <RefreshIcon />
                        </IconButton>
                        <IconButton onClick={() => openNewLink('/admin/methods')}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </div>
                {Array.isArray(art.metodos) && art.metodos.map((metodo, index) => (
                    <div key={index} className="flex items-center">
                        <FormControl fullWidth margin="normal">
                            <InputLabel id={`metodos-label-${index}`}>Métodos</InputLabel>
                            <Select
                                labelId={`metodos-label-${index}`}
                                value={metodo}
                                onChange={(e) => handleItemChange(e, 'metodos', index)}
                                fullWidth
                            >
                                <MenuItem value={-1}>Selecciona una opción</MenuItem>
                                {methods.map(method => (
                                    <MenuItem
                                        key={method.id}
                                        value={method.id}
                                        disabled={isItemSelected('metodos', method.id)}
                                    >
                                        {method.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleRemoveItem('metodos', index)}>
                                <DeleteIcon />
                            </IconButton>
                        </InputAdornment>
                    </div>
                ))}
                <div className="w-full text-end">
                    <IconButton onClick={() => handleAddItem('metodos')}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <Button type="submit" variant="contained" color="primary" className="mt-4">Guardar</Button>
        </Box>
    );
};

export default ArtForm;
