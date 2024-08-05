// src/Components/MainContent.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Artwork from './Artwork';

import Cosoraro from './Cosoraro';
import AuthorPage from './Authors/Authors';
import Exposition from './Expositions/Exposition';
import AuthRouter from 'Auth/Auth';
const MainContent = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/art" element={<Artwork />} />
            <Route path="/art/:id" element={<Artwork />} />
            <Route path="/test" element={<Cosoraro />} />
            <Route path="/expositions" element={<Exposition />} />
            <Route path="/expositions/:id" element={<Exposition />} />
            <Route path="/authors" element={<AuthorPage />} />
            <Route path="/authors/:id" element={<AuthorPage />} />
        </Routes>
    );
};

export default MainContent;
