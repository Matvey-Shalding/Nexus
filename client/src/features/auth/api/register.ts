import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

import { IRegisterRequest } from '../types/Register';
import { ISession } from '../types/Session';

export const register = async (data: IRegisterRequest) => {
	return await axiosInstance.post<ISession>(ApiRoutes.REGISTER, data);
};
