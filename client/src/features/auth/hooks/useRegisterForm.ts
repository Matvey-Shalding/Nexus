'use client';

import { TRegisterSchema, registerSchema } from '..';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useRegisterForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid, errors, isSubmitting },
		setError,
	} = useForm<TRegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
	});
	return {
		handleSubmit,
		control,
		isValid,
		setError,
		errors,
		isSubmitting,
	};
};
