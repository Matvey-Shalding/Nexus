import { axiosInstance } from '@/shared/config/axios';
import { IRefreshResponse } from '..';

export const refresh = async () => {
	return await axiosInstance.post<IRefreshResponse>('/auth/refresh');
};
