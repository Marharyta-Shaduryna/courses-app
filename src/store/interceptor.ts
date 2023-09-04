import axios from 'axios';

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('AUTH_TOKEN_REACT_COURSE');
		if (token) {
			config.headers['Authorization'] = token;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);