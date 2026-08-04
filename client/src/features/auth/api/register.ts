import { IRegisterRequest } from '..';
import { axiosInstance } from '@/shared/config/axios';

export const register = async (data: IRegisterRequest) => {
	return await axiosInstance.post('/auth/register', data);
};
