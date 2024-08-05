import React from 'react';
import GenericForm from '../Generic/GenericForm';

const styleFields = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'descripcion', label: 'Descripción' },
    { name: 'imagen', label: 'Imagen', type: 'file' }
];

const StyleForm = ({ initialData, onSubmit }) => {
    return <GenericForm initialData={initialData} onSubmit={onSubmit} fields={styleFields} />;
};

export default StyleForm;
