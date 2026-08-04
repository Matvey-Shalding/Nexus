import { IUpdateUserRequest, updateCurrentUser } from '..';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
