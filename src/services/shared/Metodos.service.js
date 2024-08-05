import createGenericService from 'services/Generic.service.jsx';
import { API_URL } from 'env/env';

const baseUrl = `${API_URL}/metodos`;
const MetodosService = createGenericService(baseUrl);

export default MetodosService;
