import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import * as Icons from '@mui/icons-material'; // Importar todos los iconos como un namespace

const AdminMenu = () => {
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('');
    const [ready, setPageReady] = useState(false);

    useEffect(() => {
        const fetchUserName = async () => {
            const user = await getUser();
            setUserName(user.name);
            setGender(user.gender);
        };

        fetchUserName();
        setPageReady(true);

    }, []);

    const menuItems = [
        { label: 'Autores', link: 'authors', icon: <Icons.Portrait /> },
        { label: 'Obras', link: 'art', icon: <Icons.ColorLens /> },
        { label: 'Exposiciones', link: 'expositions', icon: <Icons.EventNote /> },
        { label: 'Usuarios', link: 'users', icon: <Icons.People /> },
        { label: 'Métodos', link: 'methods', icon: <Icons.Build /> },
        { label: 'Estilos Artísticos', link: 'styles', icon: <Icons.FormatColorFill /> },
    ];

    return ready && (
        <div>
            <Box sx={{ textAlign: 'center', padding: '20px' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    {ready ? `${gender !== 'x' ? 'Bienvenid' : 'Hola'}${gender !== 'x' && gender === 'f' ? 'a' : 'o'}, ${userName}` : ''}
                </Typography>
                <br />
                <Grid container spacing={2} justifyContent="center">
                    {menuItems.map((item, index) => (
                        <Grid item xl={4} xs={10} l={6} key={item.link}>
                            <Link to={`/admin/${item.link}`} style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    startIcon={item.icon}
                                    fullWidth
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 100,
                                        textAlign: 'center',
                                        borderRadius: 2
                                    }}
                                >
                                    {item.label}
                                </Button>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

const getUser = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: 'Evie XD', gender: 'f' });
        }, 1000);
    });
};

export default AdminMenu;
