import React from 'react';
import GenericForm from '../Generic/GenericForm';

const AuthorForm = ({ initialData, onSubmit }) => {
    const fields = [
        { name: 'nombre', label: 'Nombre' },
        { name: 'nombre_artistico', label: 'Nombre Artístico' },
        { name: 'biografia', label: 'Biografía', multiline: true },
        { name: 'fecha_nacimiento', label: 'Fecha de Nacimiento', type: 'date' },
        { name: 'fecha_fallecimiento', label: 'Fecha de Fallecimiento', type: 'date' },
        { name: 'imagen', label: 'Imagen', type: 'file' }
    ];

    return (
        <GenericForm
            initialData={initialData}
            onSubmit={onSubmit}
            fields={fields}
        />
    );
};

export default AuthorForm;
