import { IUpdateUserRequest, IUser } from '..';
import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

export const updateCurrentUser = async (data: IUpdateUserRequest) => {
	await axiosInstance.patch<IUser>(ApiRoutes.USER, data);
};
