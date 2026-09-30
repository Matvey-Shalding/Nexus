import { axiosInstance } from '@/shared/config'
import { ApiRoutes } from '@/shared/config/routes'
import { Account } from '../types/Account'

export const getAccount = async () => {
	return await axiosInstance.get<Account | null>(ApiRoutes.ACCOUNT)
}