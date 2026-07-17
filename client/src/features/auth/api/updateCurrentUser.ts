import { axiosInstance } from '@/shared/config/axios';
import { IUpdateUserRequest, IUser } from '..';
import { updateTag } from 'next/cache';

export const updateCurrentUser = async (data: IUpdateUserRequest) => {
	await axiosInstance.patch<IUser>('/users/me', data);
};
