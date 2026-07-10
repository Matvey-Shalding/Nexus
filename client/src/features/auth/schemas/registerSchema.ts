import { z } from 'zod';

const REGEXP = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

export const registerSchema = z
	.object({
		name: z
			.string('Name is required')
			.min(2, 'Name must be at least 2 characters')
			.max(20, 'Name must be at most 20 characters'),
		email: z.string('Email is required').refine(value => REGEXP.test(value), {
			error: 'Invalid email address',
		}),
		password: z
			.string('Password is required')
			.min(6, 'Password must be at least 6 characters')
			.max(20, 'Password must be at most 20 characters'),
		confirmPassword: z.string("Password confirmation is required").min(6, "Password confirmation must be at least 6 characters").max(20,"Password configuration must be at most 20 characters"),
	})
	.refine(data => data.password === data.confirmPassword, {
		error: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type TRegisterSchema = z.infer<typeof registerSchema>;