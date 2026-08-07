import { Routes } from '@/shared/config';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

import { TLoginSchema } from '../schemas/loginSchema';
import { loginUser } from '../services/loginUser';

export const useLogIn = (setError: UseFormSetError<TLoginSchema>) => {
	const router = useRouter();

	const { mutateAsync: login } = useMutation({
		mutationFn: (data: TLoginSchema) => loginUser(data),
		onSuccess: () => {
			router.push(Routes.DEFAULT);
		},
		onError: (error: AxiosError) => {
			if (error.response?.status === 401) {
				setError('root', { message: 'Invalid email or password' });
			}
		},
	});

	const onSubmit = useCallback(
		(data: TLoginSchema) => {
			toast.promise(login(data), {
				loading: 'Signing you in...',
				success: 'Welcome back to Nexus',
				error: (error: AxiosError) =>
					error.response?.status === 401 ? 'Invalid credentials' : 'Something went wrong. Please try again.',
			});
		},
		[login],
	);
	return { onSubmit };
};
