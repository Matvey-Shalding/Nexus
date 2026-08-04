import { getCurrentUser } from '..';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
	const {
		data: user,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
		select: data => data.data,
	});

	return { user, isPending, isError };
};
