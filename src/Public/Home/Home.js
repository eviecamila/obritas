import React from 'react';
import { Link } from 'react-router-dom';
import QrCode from 'Shared/Components/QR';
import { URL } from 'env/env';
function Home() {
    return (
        <div className="container mx-auto my-10 bg-white p-5 rounded-lg shadow-md max-w-3xl">
            <h1>IMCA IAP</h1>
            <br/>
            <Link to="/login">Inicia sesión aquí</Link>

            <h1>Si estas desde tu movil, escanea este QR</h1>
            <QrCode text={URL}/>
        </div>
    );
}

export default Home;
