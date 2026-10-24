import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

import { ILoginRequest } from '../types/Login';
import { ISession } from '../types/Session';

export const login = async (data: ILoginRequest) => {
	return await axiosInstance.post<ISession>(ApiRoutes.LOGIN, data);
};
