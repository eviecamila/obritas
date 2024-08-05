import React from 'react';

const Card = ({ exposition }) => {
    return (
        <a
            className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
            <img
                className="object-cover w-24 h-24 md:w-24 md:h-24 rounded-l-lg"
                src={exposition.image}
                alt={exposition.title}
            />
            <div className="flex flex-col justify-between p-2 leading-normal w-full">
                <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{exposition.title}</h5>
                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">{exposition.description}</p>
            </div>
        </a>
    );
};

export default Card;
