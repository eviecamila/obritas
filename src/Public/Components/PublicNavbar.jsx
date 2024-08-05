import React from 'react';
import Navbar from 'Shared/Components/Navbar';
import { Link } from 'react-router-dom';

const PublicNavbar = () => {
    const metadata = {
        logo: {
            link: '/',
            src: '/assets/logo.png'
        },
        top: {
            items: [
                {
                    title: 'Inicio',
                    link: '/'
                },
                {
                    title: 'Nosotros',
                    link: '/nosotros'
                },
                {
                    title: 'Contacto',
                    link: '/contacto'
                }
            ]
        },
        bottom: {
            items: []
        },
        user: {
            enabled: false, // Usuario desactivado
            avatar: '',
            name: '',
            email: '',
            items: []
        }
    };

    return <Navbar metadata={metadata} />;
};

export default PublicNavbar;
