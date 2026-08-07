import { IRegisterRequest } from '..';
import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

export const register = async (data: IRegisterRequest) => {
	return await axiosInstance.post(ApiRoutes.REGISTER, data);
};
