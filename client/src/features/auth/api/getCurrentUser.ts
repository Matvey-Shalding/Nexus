import { IUser } from '..';
import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

export const getCurrentUser = async () => {
	return axiosInstance.get<IUser>(ApiRoutes.USER);
};
