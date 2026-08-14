import { axiosInstance } from '@/shared/config/axios';
import { ApiRoutes } from '@/shared/config/routes';

export const logout = async () => {
	return await axiosInstance.post(ApiRoutes.LOGOUT);
};
