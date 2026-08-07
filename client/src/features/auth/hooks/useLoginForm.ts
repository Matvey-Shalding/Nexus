'use client';

import { TLoginSchema, loginSchema } from '..';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid, errors, isSubmitting },
		setError,
	} = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
	});

	return {
		handleSubmit,
		control,
		isSubmitting,
		isValid,
		setError,
		errors,
	};
};
