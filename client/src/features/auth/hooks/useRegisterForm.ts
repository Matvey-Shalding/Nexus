'use client';

import { TRegisterSchema, registerSchema } from '..';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useRegisterForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid, errors },
		setError,
	} = useForm<TRegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
	});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	return {
		handleSubmit,
		control,
		isValid,
		setError,
		errors,
		setIsSubmitting,
		isSubmitting,
	};
};
