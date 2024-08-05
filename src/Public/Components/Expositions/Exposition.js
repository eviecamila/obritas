import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import Fecha from '../../../Utils/Date';
import { useParams } from 'react-router-dom';
import ExposicionesService from '../../../services/shared/Exposiciones.service';
import defaultData from './Exposition.test';

const Exposition = () => {
    const { id } = useParams();
    const [showMore, setShowMore] = useState(false);
    const containerRef = useRef(null);
    const innerRef = useRef(null); // Ref para el contenido interno
    const [ready, setReady] = useState(false);

    // datos de la exposición
    const [exposition, setExposition] = useState({});
    const [authors, setAuthors] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [methods, setMethods] = useState([]);
    const [styles, setStyles] = useState([]);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await ExposicionesService.getById(id);
                    setExposition(response.data);
                    setAuthors(response.autores);
                    setArtworks(response.obras);
                    setMethods(response.metodos);
                    setStyles(response.estilos);
                } catch (error) {
                    console.error('Error fetching exposition data:', error);
                }
                setReady(true);
            };
            fetchData();
        } else {
            setReady(true);
        }
    }, [id]);

    useEffect(() => {
        if (!ready) return;

        // Actualiza max-height dependiendo del estado de showMore
        requestAnimationFrame(() => {
            const maxHeight = showMore ? `${innerRef.current.scrollHeight}px` : '0px';
            containerRef.current.style.maxHeight = maxHeight;
        });
    }, [showMore, ready]);

    if (!ready) {
        return <></>;
    }

    return (
        <div className="w-full relative flex flex-col md:flex-col items-center justify-between my-8 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-6/12 2xl:w-8/12 bg-white rounded-lg shadow p-4 mb-8">
                <div className="cover relative w-full h-64 bg-cover bg-center rounded-b-md mb-5" style={{ backgroundImage: `url(${exposition.imagen})` }}></div>
                <div className="p-4 border-y-2">
                    <h2 className="text-2xl font-bold text-center">{exposition.nombre}</h2>
                    <div className="flex items-center mt-4">
                        <img src={exposition.imagen} alt="Exposición" className="w-12 h-12 rounded-full" />
                        <div className="ml-4 flex-1">
                            <p className="font-semibold">Publicado por:</p>
                            <p>{Object.values(authors).length > 0 && Object.values(authors)[0].nombre}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col align-center">
                    <h3 className="px-8 pt-4 text-xl font-semibold mb-4">Obras</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {artworks.slice(0, 3).map((obra, index) => (
                            <Card key={index} exposition={{ title: obra.titulo, description: obra.descripcion, image: obra.imagenes[0] }} />
                        ))}
                        <div ref={containerRef} style={{
                            transition: 'max-height 0.5s ease-in-out',
                            overflow: 'hidden',
                        }}>
                            <div ref={innerRef}>
                                {artworks.slice(3).map((obra, index) => (
                                    <Card key={index + 3} exposition={{ title: obra.titulo, description: obra.descripcion, image: obra.imagenes[0] }} />
                                ))}
                            </div>
                        </div>
                    </div>
                    {artworks.length > 3 && (
                        <button
                            className="mt-4 bg-blue-500 text-white p-2 rounded"
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? 'Mostrar menos' : 'Mostrar más'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Exposition;
