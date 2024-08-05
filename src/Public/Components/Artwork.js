import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel';
import AuthorCarousel from './AuthorCarousel';
import ArtService from 'services/shared/Obras.service';

const Artwork = () => {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);
    const [moreInfoVisible, setMoreInfoVisible] = useState(false);
    const youtubeEmbed = 'https://www.youtube.com/embed/KKKm4huhjPM?si=UeJ3MhkYoB-Vik_a';

    useEffect(() => {
        ArtService.getById(id).then(response => {
            const formattedArtwork = {
                title: response.titulo,
                description: response.descripcion,
                creationDate: response.yr_creacion,
                coverImage: response.imagenes[0],
                authors: Object.values(response.autores).map(autor => ({ nombre: autor.nombre, imagen: autor.imagen })),
                styles: Object.values(response.estilos).map(estilo => estilo.nombre),
                techniques: Object.values(response.metodos).map(metodo => metodo.nombre),
                images: response.imagenes,
                additionalInfo: 'Información adicional sobre la obra...',
            };
            setArtwork(formattedArtwork);
        }).catch(error => {
            console.error('Error fetching artwork:', error);
        });
    }, [id]);

    const toggleMoreInfo = () => {
        setMoreInfoVisible(!moreInfoVisible);
    };

    if (!artwork) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto my-10 bg-white p-5 rounded-lg shadow-md max-w-3xl">
            <div className="cover relative w-full h-64 bg-cover bg-center rounded-b-md mb-5" style={{ backgroundImage: `url('${artwork.coverImage}')` }}>
                <h1 className="absolute inset-x-0 bottom-0 bg-black bg-opacity-80 text-white text-xl font-bold p-3 rounded-lg mx-auto w-max mb-4">
                    {artwork.title}
                </h1>
            </div>
            <div className="header text-center pb-5 border-gray-200 border-b-2">
                <AuthorCarousel authors={artwork.authors} />
                <div className="border-y-2 py-6"><b>{new Date(artwork.creationDate).toLocaleDateString()}</b></div>
                <div className="border-t-2 pt-6">Imagenes</div>
            </div>
            <br />
            <Carousel images={artwork.images} />
            <div className="content mx-10 mt-5">
                <div className="border-y-2 py-4">
                    <p><strong>Técnicas:</strong> {artwork.techniques.join(', ')}</p>
                    <p><strong>Estilo Artistico:</strong> {artwork.styles.join(', ')}</p>
                    <p><strong>Descripción:</strong> {artwork.description}</p>
                </div>
                {youtubeEmbed && (
                    <div className="py-4 border-y-2">
                        <p>A continuación, un video</p>
                        <div className='pt-4'>
                            <iframe className="w-full rounded-md" width="560" height="315" src={youtubeEmbed} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                )}
                <div className="text-right">
                    <button onClick={toggleMoreInfo} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 transition-colors">Más información</button>
                </div>
                {moreInfoVisible && (
                    <div className="more-info mt-5 p-4 bg-gray-100 rounded-md">
                        <p>{artwork.additionalInfo}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Artwork;
