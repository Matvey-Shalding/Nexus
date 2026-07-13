import z from 'zod';
import { EMAIL_REGEXP } from './config';

export const loginSchema = z.object({
	email: z.string('Email is required').refine(value => EMAIL_REGEXP.test(value), {
		error: 'Invalid email address',
	}),
	password: z
		.string('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(20, 'Password must be at most 20 characters'),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
