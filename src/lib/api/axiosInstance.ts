import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 3000,
    headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // 1. Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');

        // 2. If the token exists, initiate the Bearer auth header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);