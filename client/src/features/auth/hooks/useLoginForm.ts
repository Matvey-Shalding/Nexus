'use client';

import { useForm } from 'react-hook-form';
import { loginSchema, TLoginSchema } from '..';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

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

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	return {
		handleSubmit,
		control,
		isPasswordVisible,
		setIsPasswordVisible,
		isSubmitting,
		isValid,
		setError,
		errors,
		setIsSubmitting,
	};
};
