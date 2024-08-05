import React, { useState } from 'react';
import { IconButton, Modal, Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { QrCode as QrCodeIcon, OpenInNew, Edit, Delete, ArrowBack, ArrowForward } from '@mui/icons-material';

import QrCode from 'Shared/Components/QR';

/*
        PARAMS
columns: Columnas de la tabla (nombre, fecha, img, etc)
entities: Array de entidades de la table (['jose',31-01-22,img, 'juan',32-02-02, img2])
onEdit, onDelete, handleNextPage, handlePreviousPage: eventos (se maneja en los cruds)
page: pagina en la que esta
totalPages: cantidad total de paginas
entityName: nombre de la entidad para descargar el QR ('AUTOR'=>'QR_AUTOR_1', 'OBRA'=>'QR_OBRA_2')
*/
const GenericTable = ({ columns, entities, onEdit, onDelete, frontUrl, handleNextPage, handlePreviousPage, page, totalPages, entityName }) => {
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [sizeModalOpen, setSizeModalOpen] = useState(false);
    const [qrValue, setQrValue] = useState('');
    const [size, setSize] = useState(500); // Default size in pixels
    const [unit, setUnit] = useState('px'); // Default unit

    const handleViewQR = (id) => {
        setQrValue(`${frontUrl}/${id}`);
        setQrModalOpen(true);
    };

    const handleCloseQrModal = () => {
        setQrModalOpen(false);
        setQrValue('');
    };

    const handleOpenSizeModal = () => {
        setSizeModalOpen(true);
    };

    const handleCloseSizeModal = () => {
        setSizeModalOpen(false);
    };

    const handleOpenPage = (id) => {
        window.open(`/${frontUrl}/${id}`, '_blank');
    };
    //Convierte el QR en SVG y lo descarga
    const downloadQrSvg = () => {
        const svg = document.querySelector('#qr-code-container svg');
        const serializer = new XMLSerializer();
        const svgBlob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `QR_${entityName}_${qrValue.split('/').pop()}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handlePrintQR = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <div style="width: ${size}${unit}; height: ${size}${unit};">
                ${document.getElementById('qr-code-container-print').innerHTML}
            </div>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    //HTML
    return (
        <div className="generic-table-container">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessor} className="py-2 table-cell">{column.Header}</th>
                        ))}
                        <th className="py-2 table-cell">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {entities.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center">No data available</td>
                        </tr>
                    ) : (
                        entities.map((entity) => (
                            <tr key={entity.id}>
                                {columns.map((column) => (
                                    <td key={column.accessor} className="border px-4 py-2 table-cell" style={column.center ? { textAlign: '-webkit-center' } : {}}>
                                        {column.render ? column.render(entity[column.accessor], entity) : entity[column.accessor]}
                                    </td>
                                ))}
                                <td className="border px-4 py-2 table-cell">
                                    <div className="flex justify-between">
                                        <IconButton onClick={() => handleViewQR(entity.id)} color="primary">
                                            <QrCodeIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleOpenPage(entity.id)} color="primary">
                                            <OpenInNew />
                                        </IconButton>
                                        <IconButton onClick={() => onEdit(entity.id)} color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => onDelete(entity.id)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="pagination-controls grid place-items-center py-4">
                <div>
                    <IconButton onClick={handlePreviousPage} disabled={page === 1} color="primary">
                        <ArrowBack />
                    </IconButton>
                    <span>Page {page} of {totalPages}</span>
                    <IconButton onClick={handleNextPage} disabled={page === totalPages} color="primary">
                        <ArrowForward />
                    </IconButton>
                </div>
            </div>

            <Modal
                open={qrModalOpen}
                onClose={handleCloseQrModal}
                aria-labelledby="qr-modal-title"
                aria-describedby="qr-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '500px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>

                    <div id="qr-modal-description" className="mt-2 flex flex-col items-center">
                        <div id="qr-code-container">
                            <QrCode text={qrValue} size={500} />
                        </div>
                        <Button onClick={handleOpenSizeModal} variant="contained" color="primary" className="w-full mt-4">
                            Configurar Tamaño
                        </Button>
                        <br />
                        <Button onClick={handlePrintQR} variant="contained" color="primary" className="w-full mt-4">
                            Imprimir
                        </Button>
                        <br />
                        <Button onClick={downloadQrSvg} variant="contained" color="primary" className="w-full mt-4">
                            Descargar SVG
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={sizeModalOpen}
                onClose={handleCloseSizeModal}
                aria-labelledby="size-modal-title"
                aria-describedby="size-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '400px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography id="size-modal-title" variant="h6" component="h2">
                        Configurar Tamaño del QR
                    </Typography>
                    <div id="size-modal-description" className="mt-2 flex flex-col items-center">
                        <FormControl fullWidth className="mt-4">
                            <InputLabel>Tamaño</InputLabel>
                            <TextField
                                type="number"
                                value={size}
                                onChange={handleSizeChange}
                                label="Tamaño"
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                        <FormControl fullWidth className="mt-4">
                            <InputLabel>Unidad</InputLabel>
                            <Select value={unit} onChange={handleUnitChange} label="Unidad">
                                <MenuItem value="px">Pixels</MenuItem>
                                <MenuItem value="cm">Centímetros</MenuItem>
                                <MenuItem value="in">Pulgadas</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Box>
            </Modal>

            <div className='hidden' id="qr-code-container-print">
                <QrCode text={qrValue} size={size} />
            </div>
        </div>

    );
};

export default GenericTable;
