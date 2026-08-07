import { ILoginRequest, ILoginResponse } from '..';
import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

export const login = async (data: ILoginRequest) => {
	return await axiosInstance.post<ILoginResponse>(ApiRoutes.LOGIN, data);
};
