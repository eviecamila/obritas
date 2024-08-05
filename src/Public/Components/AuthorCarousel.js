import React, { useState, useEffect } from 'react';
import Modal from '../../Shared/Components/Modal';

const AuthorCarousel = ({ authors }) => {
    const [authorIndex, setAuthorIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAuthorIndex((prevIndex) => (prevIndex + 1) % Math.min(authors.length, 3));
        }, 3000); // Cambia de slide cada 3 segundos

        return () => clearInterval(interval);
    }, [authors]);

    const authorList = authors.map((author, index) => (
        <div key={index} className="flex items-center justify-between space-x-4 h-24 border-1 ">
            <img
                className="w-20 h-20 rounded-full ring-2 ring-black"
                src={author.imagen || './assets/authors/default.jpg'}
                alt={author.nombre}
            />
            <span className="text-lg font-semibold">{author.nombre}</span>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={() => alert(`Detalles de ${author.nombre}`)}>
                Detalles del autor
            </button>
        </div>
    ));

    const shortAuthorList = authors.slice(0, 3).map((author, index) => (
        <p key={index} className="text-lg font-semibold">{author.nombre}</p>
    ));
    const extraAuthorsCount = authors.length > 3 ? `... y otro${authors.length - 3 > 1 ? 's ' + String(authors.length - 3) : ''} más` : '';

    return (
        <div className="w-full md:mx-8 relative flex flex-col md:flex-row items-center justify-between my-8 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-1/2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                    {authors.slice(0, 3).map((author, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${authorIndex === index ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img
                                className="w-full h-full rounded-full border-2 border-white shadow-lg"
                                src={author.imagen || './assets/authors/default.jpg'}
                                alt={author.nombre}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    {shortAuthorList}
                    {extraAuthorsCount && <span className="text-lg font-semibold">{extraAuthorsCount}</span>}
                </div>
            </div>
            <div className="w-1/2 m-0">
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => setShowModal(true)}
                >
                    Lista de autores
                </button>
            </div>
            {
                showModal && (
                    <Modal
                        title="Lista de Autores"
                        inner={authorList}
                        onClose={() => setShowModal(false)}
                    />
                )
            }
        </div>
    );
};

export default AuthorCarousel;
