import { IRefreshResponse } from '..';
import { axiosInstance } from '@/shared/config/axios';

export const refresh = async () => {
	return await axiosInstance.post<IRefreshResponse>('/auth/refresh');
};
