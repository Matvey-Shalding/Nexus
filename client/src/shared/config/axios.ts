import { refresh, useAuthStore } from '@/features/auth';
import axios from 'axios';
import { Routes } from './routes';

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

// automatically attach access token

axiosInstance.interceptors.request.use(config => {
	const accessToken = useAuthStore.getState().accessToken;

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

// automatically refresh access token

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status === 401) {
			// ignore responses coming from refresh
			if (error.config.url === '/auth/refresh') {
				useAuthStore.getState().clearAccessToken();
				return Promise.reject(error);
			}

			// ignore already retried requests
			if (error.config._retry) {
				return Promise.reject(error);
			}

			try {
				const newAccessToken = (await refresh()).data.access_token;

				if (newAccessToken) {
					useAuthStore.getState().setAccessToken(newAccessToken);

					// mark the request as retried in order to avoid an infinite loop
					error.config._retry = true;

					return axiosInstance(error.config);
				}
			} catch (error) {
				useAuthStore.getState().clearAccessToken();

				window.location.replace(Routes.LOGIN);

				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	},
);
