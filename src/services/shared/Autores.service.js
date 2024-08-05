import createGenericService from 'services/Generic.service.jsx';

import { API_URL } from 'env/env';

const baseUrl = `${API_URL}/autores`;
const AutoresService = createGenericService(baseUrl);

export default AutoresService;
