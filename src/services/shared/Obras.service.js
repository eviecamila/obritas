import axios from 'axios';
import { API_URL } from '../../env/env';

const api_URL = `${API_URL}/obras`;

const getAllArt = async (params) => {
    const response = await axios.get(api_URL, {params});
    return response.data;
};

const getArtById = async (id) => {
    const response = await axios.get(`${api_URL}/${id}`);
    return response.data;
};

const createArt = async (art) => {
    const response = await axios.post(api_URL, art, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

const updateArt = async (id, art) => {
    const response = await axios.put(`${api_URL}/${id}`, art, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

const deleteArt = async (id) => {
    const response = await axios.delete(`${api_URL}/${id}`);
    return response.data;
};

const ArtService = {
    getAll: getAllArt,
    getById: getArtById,
    create: createArt,
    update: updateArt,
    delete: deleteArt,
};

export default ArtService;
