'use client';

import { TLoginSchema, loginSchema } from '..';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid, errors },
		setError,
	} = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
	});

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	return {
		handleSubmit,
		control,
		isSubmitting,
		isValid,
		setError,
		errors,
		setIsSubmitting,
	};
};
