import { axiosInstance } from '@/shared/config/axios';

export const logout = async () => {
	return await axiosInstance.post('/auth/logout');
};
