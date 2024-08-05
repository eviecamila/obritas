// src/Components/AuthRouter.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='/*' element={<Navigate to='login'/>}/>
        </Routes>
    );
};

export default AuthRouter;
