import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Box } from '@mui/material';

const QrCode = ({ text, size }) => {
    const [qrCodeSvg, setQrCodeSvg] = useState('');

    useEffect(() => {
        const generateQR = async (text) => {
            try {
                const svg = await QRCode.toString(text, { type: 'svg', width: size });
                setQrCodeSvg(svg);
            } catch (err) {
                console.error(err);
            }
        };

        generateQR(text);
    }, [text, size]);

    return (
        <Box dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
    );
};

export default QrCode;
