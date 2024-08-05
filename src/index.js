import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './tw'
// Importa Flowbite
import 'flowbite';
import 'flowbite/dist/flowbite.js';

const theme = createTheme({
  palette: {
    mode: 'light', // Cambia a 'dark' si deseas un tema oscuro
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>
);
