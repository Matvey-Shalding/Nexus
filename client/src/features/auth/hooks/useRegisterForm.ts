'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useState } from 'react';
import { TRegisterSchema, registerSchema } from '..';

export const useRegisterForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid, isSubmitting },
	} = useForm<TRegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

	return {
		handleSubmit,
		control,
		isPasswordVisible,
		setIsPasswordVisible,
		isConfirmPasswordVisible,
		setIsConfirmPasswordVisible,
		isValid,
		isSubmitting,
	};
};
