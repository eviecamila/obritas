import createGenericService from 'services/Generic.service.jsx';

import { API_URL } from '../../env/env';

const baseUrl = `${API_URL}/estilos`;
const EstilosService = createGenericService(baseUrl);

export default EstilosService;
