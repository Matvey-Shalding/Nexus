'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useState } from 'react';
import { TRegisterSchema, registerSchema } from '..';

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
