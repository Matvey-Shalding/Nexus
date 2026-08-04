import { IUser } from '@/features/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { TEditProfileSchema, editProfileSchema } from '../schemas/editProfileSchema';

export const useProfileForm = (user: IUser | undefined, isPending: boolean) => {
	const {
		control,
		handleSubmit,
		reset,
		setError,
		formState: { isDirty },
	} = useForm<TEditProfileSchema>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			name: user?.name,
			email: user?.email,
		},
		mode: 'onChange',
	});

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const disabled = useMemo(() => {
		return isSubmitting || isPending || !isDirty;
	}, [isSubmitting, isPending, isDirty]);

	return {
		control,
		handleSubmit,
		reset,
		setError,
		disabled,
		setIsSubmitting,
	};
};
