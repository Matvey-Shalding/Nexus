import { IRegisterRequest, login, register } from '..';

export const registerUser = async (data: IRegisterRequest, setAccessToken: (token: string) => void) => {
	await register(data);

	const response = await login({
		email: data.email,
		password: data.password,
	});

	setAccessToken(response.data.access_token);

	return response;
};
