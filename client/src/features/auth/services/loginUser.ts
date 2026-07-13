import { ILoginRequest, login, useAuthStore } from '..';

export const loginUser = async (data: ILoginRequest) => {
	const response = await login({
		email: data.email,
		password: data.password,
	});

	const setAccessToken = useAuthStore.getState().setAccessToken;

	setAccessToken(response.data.access_token);

	return response;
};
