
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './Public/Components/MainContent';
import AdminMain from './Administrative/AdminMain';
import PublicNavbar from 'Public/Components/PublicNavbar';
import QrCode from 'Shared/Components/QR';
import AuthRouter from 'Auth/Auth';
import LoadingCircle from 'Shared/Components/LoadingCircle';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<div><PublicNavbar /><MainContent /></div>} />
        <Route path="/admin/*" element={<AdminMain />} />
        <Route path="/test/*" element={<LoadingCircle />} />
        <Route path="/cagar/*" element={<QrCode />} />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
