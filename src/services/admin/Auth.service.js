import axios from 'axios';
import { API_URL as URL } from 'env/env'; // Asegúrate de que 'env/env' apunta al archivo correcto que exporta la URL base

const API_URL = `${URL}/auth`;

class AuthService {
    login(user, pass) {
        let form = new FormData();
        form.append('username', user);
        form.append('password', pass);
        return axios.post(`${API_URL}/login`, form)
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                }
                return response.data;
            });
    }

    logout() { localStorage.removeItem('token'); }

    register(username, email, password) {
        return axios.post(`${API_URL}/register`, {
            username,
            email,
            password
        });
    }

    verify() {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.reject(new Error('No token found'));
        }
        return axios.post(`${API_URL}/verify`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                }
                return response.data;
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.logout();
                    window.location.reload();
                }
                return Promise.reject(error);
            });
    }

    getCurrentUser() {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub; // Asumiendo que el nombre de usuario se almacena en el "sub" claim
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }


    navigateToLogin() { window.location.href = '/auth/login'; }

}

export default new AuthService();
