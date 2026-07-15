'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup } from '@/shared/ui/field';

import { Loader, Lock, Mail } from 'lucide-react';

import { Routes } from '@/shared/config/routes';
import { InputGroupAddon } from '@/shared/ui/input-group';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { toast } from 'sonner';
import { FormInput, TLoginSchema, useLoginForm, VisibilityToggle } from '..';
import { loginUser } from '../services/loginUser';
import { Logo } from '@/shared/ui/logo'

interface Props {
	className?: string;
}

export const LoginForm: React.FC<Props> = memo(({ className }: { className?: string }) => {
	const {
		handleSubmit,
		control,
		isPasswordVisible,
		setIsPasswordVisible,
		isSubmitting,
		isValid,
		setError,
		errors,
		setIsSubmitting,
	} = useLoginForm();

	const router = useRouter();

	const onSubmit = async (data: TLoginSchema) => {
		// Swap with TLoginSchema when ready
		setIsSubmitting(true);

		await toast.promise(loginUser(data), {
			loading: 'Signing you in...',
			success: () => {
				router.push(Routes.TASKS);
				return 'Welcome back to Nexus';
			},
			error: (error: AxiosError) => {
				if (error.response?.status === 401) {
					setError('root', { message: 'Invalid email or password' });
					return 'Invalid credentials';
				} else {
					return 'Something went wrong. Please try again.';
				}
			},
			finally: () => {
				setIsSubmitting(false);
			},
		});
	};

	return (
		<div className={cn('flex flex-col gap-6 w-120', className)}>
			<Card className="card_gradient">
				<div className="flex flex-col gap-2">
					<Logo className='self-center'/>
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Welcome back</CardTitle>
						<CardDescription>Log in to access your command center.</CardDescription>
					</CardHeader>
				</div>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<FormInput
								fieldName="email"
								control={control}
								label="Email"
								type="email"
								placeholder="m@example.com"
							>
								<InputGroupAddon>
									<Mail className="size-4.5" />
								</InputGroupAddon>
							</FormInput>

							<FormInput
								fieldName="password"
								control={control}
								label="Password"
								type={isPasswordVisible ? 'text' : 'password'}
								placeholder="•••••••••••••••••••••••"
							>
								<>
									<InputGroupAddon>
										<Lock className="size-4.5" />
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<VisibilityToggle
											isVisible={isPasswordVisible}
											setIsVisible={setIsPasswordVisible}
										/>
									</InputGroupAddon>
								</>
							</FormInput>

							<Field>
								<div className="flex flex-col gap-y-1">
									<FieldError errors={[errors.root]} />
									<Button
										disabled={!isValid || isSubmitting}
										size="lg"
										type="submit"
									>
										{isSubmitting ? (
											<span className="flex items-center gap-x-1.5">
												<Loader className="animate-spin size-4" />
												Logging in...
											</span>
										) : (
											<span>Enter workspace</span>
										)}
									</Button>
								</div>
								<FieldDescription className="text-center">
									Don't have an account? <Link href={Routes.REGISTER}>Sign up</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
});
