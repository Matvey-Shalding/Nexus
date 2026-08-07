import { Routes } from '@/shared/config';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

import { TLoginSchema } from '../schemas/loginSchema';
import { TRegisterSchema } from '../schemas/registerSchema';
import { registerUser } from '../services/registerUser';

export const useRegister = (setError: UseFormSetError<TLoginSchema>) => {
	const router = useRouter();

	const { mutateAsync: register } = useMutation({
		mutationFn: (data: TRegisterSchema) => registerUser(data),
		onSuccess: () => {
			router.push(Routes.DEFAULT);
		},
		onError: (error: AxiosError) => {
			if (error.response?.status === 409) {
				setError('email', { message: 'User already exists' });
			}
		},
	});

	const onSubmit = useCallback(
		(data: TRegisterSchema) => {
			toast.promise(register(data), {
				loading: 'Signing you in...',
				success: 'Welcome to Nexus',
				error: (error: AxiosError) =>
					error.response?.status === 409 ? 'User already exists' : 'Something went wrong. Please try again.',
			});
		},
		[register],
	);

	return { onSubmit };
};
