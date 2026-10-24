import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

import { IUser } from '../types/User';

export const getCurrentUser = async () => {
	return axiosInstance.get<IUser>(ApiRoutes.USER);
};
