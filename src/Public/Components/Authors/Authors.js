import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../../Shared/Components/Modal';
import Carousel from './../Carousel';
import AutorService from '../../../services/shared/Autores.service';
import Card from '../Expositions/Card';

const AuthorPage = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const containerRef = useRef(null);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        AutorService.getById(id, { d: 1 }).then(response => {
            const formattedAuthor = {
                name: response.nombre,
                image: response.imagen,
                bio: response.biografia,
                coverImage: response.coverImage || 'cover.jfif', // Update if you have a cover image field
                youtubeEmbed: 'https://www.youtube.com/embed/KKKm4huhjPM?si=UeJ3MhkYoB-Vik_a', // Update if you have a youtube field
                location: response.location || 'Desconocida', // Update if you have a location field
                activePeriod: `${response.fecha_nacimiento} - ${response.fecha_fallecimiento || 'Presente'}`,
                works: response.obras.obras.map(obra => ({
                    title: obra.titulo,
                    image: obra.imagenes[0],
                    description: obra.descripcion,
                })),
            };
            setAuthor(formattedAuthor);
        }).catch(error => {
            console.error('Error fetching author:', error);
        });
    }, [id]);

    if (!author) {
        return <div>Loading...</div>;
    }

    const shortAuthorList = author.works.map((work, index) => (
        <div key={index} className="flex items-center justify-between space-x-4 h-24 border-1">
            <img
                className="w-20 h-20 rounded-full ring-2 ring-black"
                src={work.image}
                alt={work.title}
            />
            <span className="text-lg font-semibold">{work.title}</span>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={() => alert(`Detalles de ${work.title}`)}>
                Detalles de la obra
            </button>
        </div>
    ));

    return (
        <div className="container mx-auto my-10 bg-white p-5 rounded-lg shadow-md max-w-3xl">
            <div className="cover relative w-full h-64 bg-cover bg-center rounded-md mb-5" style={{ backgroundImage: `url('/assets/${author.coverImage}')` }}>
            </div>
            <div className="header flex items-center justify-between pb-5 border-b border-gray-200">
                <div className="flex items-center">
                    <img className="object-cover w-16 h-16 rounded-full" src={author.image} alt={author.name} />
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold">{author.name}</h2>
                        <p className="text-gray-600">{author.activePeriod}</p>
                        <p className="text-gray-600"><i className="fas fa-map-marker-alt"></i> {author.location} | ({author.works.length} Obras)</p>
                    </div>
                </div>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={toggleModal}>
                    Lista de obras
                </button>
            </div>
            <div className="mb-5">
                <h1 className='text-xl font-bold'>Biografía</h1>
                <p>{author.bio}</p>
            </div>
            <div className="text-center mb-5">
                <iframe className="w-full rounded-md" width="560" height="315" src={author.youtubeEmbed} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            {/* <Carousel works={author.works} /> */}
            <div className="flex flex-col align-center">
                <h3 className="px-8 pt-4 text-xl font-semibold mb-4">Obras</h3>
                <div className="flex flex-col gap-4">
                    {author.works.slice(0, 3).map((exposition, index) => (
                        <Card key={index} exposition={exposition} />
                    ))}

                    {showMore && (
                        <div ref={containerRef}>
                            {author.works.slice(3).map((exposition, index) => (
                                <Card key={index + 3} exposition={exposition} />
                            ))}
                        </div>
                    )}
                </div>
                {author.works.length > 3 && (
                    <button
                        className="mt-4 bg-blue-500 text-white p-2 rounded"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? 'Mostrar menos' : 'Mostrar más'}
                    </button>
                )}
            </div>
            {showModal && (
                <Modal
                    title="Lista de Obras"
                    inner={shortAuthorList}
                    onClose={toggleModal}
                />
            )}
        </div>
    );
};

export default AuthorPage;
