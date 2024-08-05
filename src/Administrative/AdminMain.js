import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ArtCrud from './cruds/Cruds/ArtCrud';
import AuthorCrud from './cruds/Cruds/AuthorCrud';
import StyleCrud from './cruds/Cruds/StyleCrud';
import MethodsCrud from './cruds/Cruds/MethodsCrud';
import AdminMenu from './Menu/AdminMenu';
import AdminNavbar from './AdminNavbar';
import ExpositionCrud from './cruds/Cruds/ExpositionCrud';
//Services
import auth from '../services/admin/Auth.service';
import LoadingCircle from 'Shared/Components/LoadingCircle';


const AdminMain = () => {
    //Procesar al cargar todo el modulo de ADMIN
    const [ready, setReady] = useState(false)
    useEffect(() => {
        if (!localStorage.getItem('token')) auth.navigateToLogin()
        auth.verify().catch(() => {
            // El token no es válido o ha expirado, recargar la página
            auth.logout();
            auth.navigateToLogin()
        });
        setReady(true)
    }, []);

    //Routing del apartado ADMIN
    return ready && (
        <div>
            <AdminNavbar />
            <div className="mx-auto my-10 bg-white p-5 max-w-3xl">
                <Routes>
                    <Route path="/*" element={<AdminMenu />} />
                    <Route path="/art" element={<ArtCrud />} />
                    <Route path="/styles" element={<StyleCrud />} />
                    <Route path="/authors" element={<AuthorCrud />} />
                    <Route path="/expositions" element={<ExpositionCrud />} />
                    <Route path="/methods" element={<MethodsCrud />} />
                </Routes>
            </div>
        </div>
    )
};


export default AdminMain;
