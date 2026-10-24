import { useAuthStore } from '../store/auth.store';
import { ISession } from '../types/Session';

export const setAccessToken = (session: ISession): void => {
	if (session.token_type == 'Bearer') {
		const setAccessToken = useAuthStore.getState().setAccessToken;

		setAccessToken(session.access_token);
	}
};
