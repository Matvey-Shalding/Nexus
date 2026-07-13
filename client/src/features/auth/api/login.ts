import { axiosInstance } from '@/shared/config/axios';
import { ILoginRequest, ILoginResponse } from '..';

export const login = async (data: ILoginRequest) => {
	return await axiosInstance.post<ILoginResponse>('/auth/login', data);
};
