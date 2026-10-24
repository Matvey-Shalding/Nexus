import { login } from '../api/login';
import { ILoginRequest } from '../types/Login';

import { setAccessToken } from './setAccessToken';

export const loginUser = async (data: ILoginRequest) => {
	const session = await login({
		email: data.email,
		password: data.password,
	});

	setAccessToken(session.data);

	return session;
};
