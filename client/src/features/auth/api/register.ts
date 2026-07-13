import { axiosInstance } from '@/shared/config/axios';
import { IRegisterRequest } from '..';

export const register = async (data: IRegisterRequest) => {
	return await axiosInstance.post('/auth/register', data);
};
