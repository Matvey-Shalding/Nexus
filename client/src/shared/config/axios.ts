import { refresh, useAuthStore } from '@/features/auth';
import axios, { InternalAxiosRequestConfig } from 'axios';

import { ApiRoutes } from './routes';

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

const AUTH_ROUTES: string[] = [ApiRoutes.LOGIN, ApiRoutes.REGISTER, ApiRoutes.REFRESH];
const isAuthRoute = (url?: string) => !!url && AUTH_ROUTES.includes(url);

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = (): Promise<string | null> => {
	if (!refreshPromise) {
		refreshPromise = refresh()
			.then(response => {
				const token: string = response.data.access_token;
				useAuthStore.getState().setAccessToken(token);
				return token;
			})
			.catch(() => {
				useAuthStore.getState().clearAccessToken();
				return null;
			})
			.finally(() => {
				refreshPromise = null;
			});
	}
	return refreshPromise;
};

axiosInstance.interceptors.request.use(async config => {
	// Never gate auth endpoints on having a token (this is what prevents the deadlock)
	if (isAuthRoute(config.url)) return config;

	const token = useAuthStore.getState().accessToken ?? (await refreshAccessToken());

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const config = error.config as RetriableConfig | undefined;

		if (error.response?.status !== 401 || !config || config._retry || isAuthRoute(config.url)) {
			return Promise.reject(error);
		}

		config._retry = true;

		const token = await refreshAccessToken();

		if (!token) return Promise.reject(error);

		return axiosInstance(config); // request interceptor attaches the new token
	},
);
