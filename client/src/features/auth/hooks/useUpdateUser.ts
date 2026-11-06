import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCurrentUser } from '../api/updateCurrentUser';
import { IUpdateUserRequest } from '../types/User';

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationFn: (data: IUpdateUserRequest) => updateCurrentUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	return mutateAsync;
};
