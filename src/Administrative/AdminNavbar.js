import React from 'react';
import Navbar from 'Shared/Components/Navbar';

const AdminNavbar = () => {
    const metadata = {
        logo: {
            link: '/admin',
            src: '/assets/logo.png'
        },
        top:{
            items: [
                {
                    title: 'Dashboard',
                    link: '/admin/dashboard'
                },
                {
                    title: 'Catalogos',
                    subItems: [
                        { title: 'Autores', link: '/admin/authors' },
                        { title: 'Obras', link: '/admin/art' },
                        { title: 'Exposiciones', link: '/admin/expositions' },
                        { title: 'Usuarios', link: '/admin/users' },
                        { title: 'Métodos', link: '/admin/methods' },
                        { title: 'Estilos Artísticos', link: '/admin/styles' }
                    ],
                    icon: (
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18m-7 5h7" />
                        </svg>
                    ),
                    link: '#'
                }
            ],
        },
        bottom:{
            items: [
                {
                    title: 'Cerrar Sesion',
                    link: '/admin/logout',
                },
            ],
        },
        user: {
            enabled: true,
            avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
            name: 'Neil Sims',
            email: 'neil.sims@flowbite.com',
            items: [
                { title: 'Dashboard', link: '#' },
                { title: 'Settings', link: '#' },
                { title: 'Earnings', link: '#' },
                { title: 'Sign out', link: '#' }
            ]
        }
    };

    return <Navbar metadata={metadata} />;
};

export default AdminNavbar;
