import React from 'react';
import GenericForm from '../Generic/GenericForm';

const methodFields = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'descripcion', label: 'Descripción' },
    { name: 'imagen', label: 'Imagen', type: 'file' },
];

const MethodForm = ({ initialData, onSubmit }) => {
    return <GenericForm initialData={initialData} onSubmit={onSubmit} fields={methodFields} />;
};

export default MethodForm;
