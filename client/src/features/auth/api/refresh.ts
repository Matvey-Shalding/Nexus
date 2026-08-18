import { IRefreshResponse } from '..';
import { ApiRoutes } from '@/shared/config/routes';
import axios from 'axios';

const authClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

export const refresh = async () => {
	return await authClient.post<IRefreshResponse>(ApiRoutes.REFRESH);
};
