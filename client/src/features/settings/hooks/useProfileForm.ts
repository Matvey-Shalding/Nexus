import { useForm } from 'react-hook-form';
import { editProfileSchema, TEditProfileSchema } from '../schemas/editProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUser } from '@/features/auth';
import { useMemo, useState } from 'react';

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
