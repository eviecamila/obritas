import axios from 'axios';

const createGenericService = (baseUrl) => {
    const getAll = (params = { skip: 0, limit: 10, searchTerm: '' }) => {
        return axios.get(baseUrl, { params })
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching data from ${baseUrl}:`, error);
                throw error;
            });
    };

    const getById = (id, params = {}) => {
        return axios.get(`${baseUrl}/${id}`, { params })
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching data from ${baseUrl}/${id}:`, error);
                throw error;
            });
    };

    const getList = () => {
        return axios.get(baseUrl, { params: { l: 1 } })
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data ', error);
                throw error;
            });
    };

    const create = (data) => {
        return axios.post(baseUrl, data)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error creating data at ${baseUrl}:`, error);
                throw error;
            });
    };

    const update = (id, data) => {
        return axios.put(`${baseUrl}/${id}`, data)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error updating data at ${baseUrl}/${id}:`, error);
                throw error;
            });
    };

    const deleteEntity = (id) => {
        return axios.delete(`${baseUrl}/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error deleting data from ${baseUrl}/${id}:`, error);
                throw error;
            });
    };

    return { getAll, getById, getList, create, update, delete: deleteEntity };
};

export default createGenericService;
