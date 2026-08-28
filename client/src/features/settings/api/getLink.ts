import { axiosInstance } from '@/shared/config'
import { ApiRoutes } from '@/shared/config/routes'

interface Response {
	link: string
}

export const getLink = async () => {
	return (await axiosInstance.get<Response>(ApiRoutes.LINK)).data;
}