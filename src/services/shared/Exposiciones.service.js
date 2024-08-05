import createGenericService from 'services/Generic.service.jsx';
import { API_URL } from '../../env/env.js';
import axios from 'axios';

const baseUrl = `${API_URL}/exposiciones`;
const genericService = createGenericService(baseUrl);

const getAvailableArts = (id) => {
    return axios.get(`${API_URL}/obras?expo=${id}&l=1`).then(response => response.data);
};

const ExposicionesService = {
    ...genericService,
    getAvailableArts,
};

export default ExposicionesService;
