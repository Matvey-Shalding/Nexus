'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup } from '@/shared/ui/field';
import { Logo } from '@/shared/ui/logo';

import { Loader, Lock, Mail, User } from 'lucide-react';

import { Routes } from '@/shared/config/routes';
import { InputGroupAddon } from '@/shared/ui/input-group';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { toast } from 'sonner';
import { FormInput, registerUser, TRegisterSchema, useRegisterForm, VisibilityToggle } from '..';

interface Props {
	className?: string;
}

//TODO: test register

export const RegisterForm: React.FC<Props> = memo(({ className }: { className?: string }) => {
	const {
		handleSubmit,
		control,
		isPasswordVisible,
		setIsPasswordVisible,
		isConfirmPasswordVisible,
		setIsConfirmPasswordVisible,
		isSubmitting,
		isValid,
		setError,
		errors,
		setIsSubmitting,
	} = useRegisterForm();

	const router = useRouter();

	const onSubmit = async (data: TRegisterSchema) => {
		setIsSubmitting(true);

		await toast.promise(registerUser(data), {
			loading: 'Creating your account...',
			success: () => {
				router.push(Routes.TASKS);
				return 'Welcome to Nexus';
			},
			error: (error: AxiosError) => {
				if (error.response?.status === 409) {
					setError('email', { message: 'User already exists' });
					return 'User already exists';
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
				<div className="flex flex-col gap-y-2.5">
					<Logo />
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Build your command center</CardTitle>
						<CardDescription>Everything you need to manage your day, in one place.</CardDescription>
					</CardHeader>
				</div>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<FormInput
								fieldName="name"
								control={control}
								label="Name"
								placeholder="John Doe"
								type="text"
							>
								<InputGroupAddon>
									<User className="size-4.5" />
								</InputGroupAddon>
							</FormInput>
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
							<Field>
								<Field className="grid grid-cols-2 gap-4">
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
									<FormInput
										fieldName="confirmPassword"
										control={control}
										label="Confirm Password"
										type={isConfirmPasswordVisible ? 'text' : 'password'}
										placeholder="•••••••••••••••••••••••"
									>
										<>
											<InputGroupAddon>
												<Lock className="size-4.5" />
											</InputGroupAddon>
											<InputGroupAddon align="inline-end">
												<VisibilityToggle
													isVisible={isConfirmPasswordVisible}
													setIsVisible={setIsConfirmPasswordVisible}
												/>
											</InputGroupAddon>
										</>
									</FormInput>
								</Field>
							</Field>
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
												Loading...
											</span>
										) : (
											<span>Launch workspace</span>
										)}
									</Button>
								</div>
								<FieldDescription className="text-center">
									Already have an account? <Link href={Routes.LOGIN}>Sign in</Link>
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
