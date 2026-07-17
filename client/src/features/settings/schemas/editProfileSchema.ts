import { EMAIL_REGEXP } from '@/features/auth/schemas/config';
import { z } from 'zod';

export const editProfileSchema = z.object({
	name: z
		.string('Name is required')
		.min(2, 'Name must be at least 2 characters')
		.max(20, 'Name must be at most 20 characters'),
	email: z.string('Email is required').refine(value => EMAIL_REGEXP.test(value), {
		error: 'Invalid email address',
	}),
});

export type TEditProfileSchema = z.infer<typeof editProfileSchema>;
