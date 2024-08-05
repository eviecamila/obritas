// src/components/ui/MainContent.js
import CardComponent from './CardComponent';
import TopBar from '../topbar/TopBar';
import ObrasService from '../../../../services/shared/Obras.service';
import React, { useState, useEffect } from 'react';

const ObrasMainContent = () => {
  const [arts, setArts] = useState([]);
  const [autores, setAutores] = useState([]);
  const [metodos, setMetodos] = useState([]);
  const [estilos, setEstilos] = useState([]);

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await ObrasService.getAllObras();
        setArts(response.data.obras);
        setAutores(response.data.autores);
        setMetodos(response.data.metodos);
        setEstilos(response.data.estilos);
      } catch (error) {
        console.error('Error fetching obras:', error);
      }
    };

    fetchObras();
  }, []);

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 ">
      <TopBar/>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {arts.map((art) => (
          <CardComponent
            key={art.id}
            title={art.titulo}
            description={art.descripcion}
            yr_creacion={art.yr_creacion}
            fecha_alta={art.fecha_alta}
            terminada={art.terminada}
            estilos={art.estilos.map((m) => (estilos[m].nombre))}
            metodos={art.metodos.map((m) => (metodos[m].nombre))}
            autores={art.autores.map((m) => (autores[m].nombre))}
            imagen={art.imagen}
          />
        ))}
      </div>
    </main>
  );
};

export default ObrasMainContent;
