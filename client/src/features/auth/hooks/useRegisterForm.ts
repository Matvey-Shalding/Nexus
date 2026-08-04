'use client';

import { TRegisterSchema, registerSchema } from '..';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// TODO: refresh logic + login

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

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	return {
		handleSubmit,
		control,
		isPasswordVisible,
		setIsPasswordVisible,
		isConfirmPasswordVisible,
		setIsConfirmPasswordVisible,
		isValid,
		setError,
		errors,
		setIsSubmitting,
		isSubmitting,
	};
};
