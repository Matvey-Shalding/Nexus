import { register } from '../api/register';
import { IRegisterRequest } from '../types/Register';
import { setAccessToken } from './setAccessToken';

export const registerUser = async (data: IRegisterRequest) => {
	const session = await register(data);

	setAccessToken(session.data);

	return session;
};
