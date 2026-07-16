import { axiosInstance } from '@/shared/config/axios';

import { delay } from '@/lib/delay';
import { IUser } from '..';

export const getCurrentUser = async () => {
	return axiosInstance.get<IUser>('/users/me');
};
