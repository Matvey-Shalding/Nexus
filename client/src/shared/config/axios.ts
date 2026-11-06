import { refresh, useAuthStore } from '@/features/auth';
import axios from 'axios';

import { ApiRoutes } from './routes';

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

let initializationPromise: Promise<string | null> | null = null;

const initializeAccessToken = async (): Promise<string | null> => {
	const accessToken = useAuthStore.getState().accessToken;

	if (accessToken) {
		return accessToken;
	}

	if (!initializationPromise) {
		initializationPromise = refresh()
			.then(response => {
				const accessToken = response.data.access_token;

				useAuthStore.getState().setAccessToken(accessToken);

				return accessToken;
			})
			.catch(() => {
				useAuthStore.getState().clearAccessToken();

				return null;
			})
			.finally(() => {
				initializationPromise = null;
			});
	}

	return initializationPromise;
};

axiosInstance.interceptors.request.use(async config => {
	let accessToken = useAuthStore.getState().accessToken;

	if (!accessToken) {
		accessToken = await initializeAccessToken();
	}

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status !== 401) {
			return Promise.reject(error);
		}

		const url = error.config?.url;

		if (url === ApiRoutes.REFRESH) {
			useAuthStore.getState().clearAccessToken();
			return Promise.reject(error);
		}

		if (url === ApiRoutes.REGISTER || url === ApiRoutes.LOGIN) {
			return Promise.reject(error);
		}

		if (error.config._retry) {
			return Promise.reject(error);
		}

		try {
			const newAccessToken = (await refresh()).data.access_token;

			useAuthStore.getState().setAccessToken(newAccessToken);

			error.config._retry = true;

			return axiosInstance(error.config);
		} catch {
			useAuthStore.getState().clearAccessToken();

			return Promise.reject(error);
		}
	},
);
