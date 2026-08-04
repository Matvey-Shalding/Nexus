import { IUser } from '..';
import { delay } from '@/lib/delay';
import { axiosInstance } from '@/shared/config/axios';

export const getCurrentUser = async () => {
	return axiosInstance.get<IUser>('/users/me');
};
