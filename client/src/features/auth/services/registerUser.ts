import { IRegisterRequest, register } from '..';
import { loginUser } from './loginUser';

export const registerUser = async (data: IRegisterRequest) => {
	await register(data);

	return await loginUser({ email: data.email, password: data.password });
};
