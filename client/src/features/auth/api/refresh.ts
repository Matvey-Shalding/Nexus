import { IRefreshResponse } from '..';
import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

export const refresh = async () => {
	return await axiosInstance.post<IRefreshResponse>(ApiRoutes.REFRESH);
};
