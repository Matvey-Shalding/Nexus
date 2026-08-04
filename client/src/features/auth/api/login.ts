import { ILoginRequest, ILoginResponse } from '..';
import { axiosInstance } from '@/shared/config/axios';

export const login = async (data: ILoginRequest) => {
	return await axiosInstance.post<ILoginResponse>('/auth/login', data);
};
