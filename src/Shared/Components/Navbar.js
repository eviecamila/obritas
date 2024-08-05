import React from 'react';
import { Link } from 'react-router-dom';
import 'flowbite';

const Navbar = ({ metadata = {} }) => {
    const defaultMetadata = {
        logo: {
            link: '/',
            src: '/assets/logo.png'
        },
        top: {
            items: [
                {
                    title: 'Menu Principal',
                    icon: (
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    ),
                    link: '/dashboard'
                }
            ]
        },
        bottom: {
            items: [
                {
                    title: 'Cerrar Sesión',
                    icon: (
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7M4 6h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                        </svg>
                    ),
                    link: '/logout'
                }
            ]
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

    metadata = { ...defaultMetadata, ...metadata };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link to={metadata.logo.link} className="flex ms-2 md:me-24 md:ml-16 ml-4">
                                <img src={metadata.logo.src} className="h-8 me-3" alt="Logo" />
                            </Link>
                        </div>
                        {metadata.user.enabled && (
                            <div className="flex items-center relative">
                                <button
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    aria-expanded="false"
                                    data-dropdown-toggle="dropdown-user"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src={metadata.user.avatar} alt="user photo" />
                                </button>
                                <div className="z-50 hidden absolute top-full right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3">
                                        <p className="text-sm text-gray-900 dark:text-white">
                                            {metadata.user.name}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                                            {metadata.user.email}
                                        </p>
                                    </div>
                                    <ul className="py-1">
                                        {metadata.user.items.map((item, index) => (
                                            <li key={index}>
                                                <Link to={item.link} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    {/* Top Section */}
                    {metadata.top && metadata.top.items && (
                        <ul className="space-y-2 font-medium">
                            {metadata.top.items.map((item, index) => (
                                <li key={index}>
                                    {item.subItems ? (
                                        <>
                                            <button
                                                type="button"
                                                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                aria-controls={`submenu-${index}`}
                                                data-collapse-toggle={`submenu-${index}`}
                                            >
                                                {item.icon}
                                                <span className="ms-3">{item.title}</span>
                                                <svg className="w-6 h-6 ms-auto rotate-180 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path clipRule="evenodd" fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"></path>
                                                </svg>
                                            </button>
                                            <ul id={`submenu-${index}`} className="hidden space-y-2">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link to={subItem.link} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                            {subItem.icon}
                                                            <span className="ms-3">{subItem.title}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <Link to={item.link} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            {item.icon}
                                            <span className="ms-3">{item.title}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    {/* Bottom Section */}
                    {metadata.bottom && metadata.bottom.items && (
                        <ul className="absolute bottom-0 w-full p-4 space-y-2 bg-gray-50 dark:bg-gray-800">
                            {metadata.bottom.items.map((item, index) => (
                                <li key={index}>
                                    <Link to={item.link} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        {item.icon}
                                        <span className="ms-3">{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Navbar;
