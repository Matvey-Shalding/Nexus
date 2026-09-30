import { axiosInstance } from '@/shared/config';
import { ApiRoutes } from '@/shared/config/routes';

export const deleteAccount = async () => {
	await axiosInstance.delete(ApiRoutes.ACCOUNT);
};
