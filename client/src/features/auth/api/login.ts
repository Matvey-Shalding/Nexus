import { axiosInstance } from '@/shared/config/axios'
import { ILoginRequest } from '..'

export const login = async (data: ILoginRequest) => {
	return await axiosInstance.post('/auth/login', data);
};