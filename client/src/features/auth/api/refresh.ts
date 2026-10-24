import { ApiRoutes } from '@/shared/config/routes';
import axios from 'axios';

import { ISession } from '../types/Session';

const authClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

export const refresh = async () => {
	return await authClient.post<ISession>(ApiRoutes.REFRESH);
};
