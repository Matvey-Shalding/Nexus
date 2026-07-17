import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUpdateUserRequest, updateCurrentUser } from '..';

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
