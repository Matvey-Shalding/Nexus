import { z } from 'zod';
import { loginSchema } from './loginSchema';

export const registerSchema = loginSchema
	.extend({
		name: z
			.string('Name is required')
			.min(2, 'Name must be at least 2 characters')
			.max(20, 'Name must be at most 20 characters'),
		confirmPassword: z
			.string('Password confirmation is required')
			.min(6, 'Password confirmation must be at least 6 characters')
			.max(20, 'Password configuration must be at most 20 characters'),
	})
	.refine(data => data.password === data.confirmPassword, {
		error: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type TRegisterSchema = z.infer<typeof registerSchema>;
