import { useCurrentUser, useUpdateUser } from '@/features/auth';
import { FormInput } from '@/shared/components/FormInput';
import { Button } from '@/shared/ui/button';
import { FieldGroup } from '@/shared/ui/field';
import { InputGroupAddon } from '@/shared/ui/input-group';
import { Separator } from '@/shared/ui/separator';
import { TabsContent } from '@/shared/ui/tabs';
import { AxiosError } from 'axios';
import { Mail, User } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { useProfileForm } from '../../hooks/useProfileForm';
import { TEditProfileSchema } from '../../schemas/editProfileSchema';
import { SettingsTabTitle } from '../SettingsTabTitle';

interface Props {
	className?: string;
}

export const ProfileTab: React.FC<Props> = ({}) => {
	const { user, isPending } = useCurrentUser();

	const updateUser = useUpdateUser();

	const { control, handleSubmit, reset, setError, disabled, setIsSubmitting } = useProfileForm(user, isPending);

	const onSubmit = async (data: TEditProfileSchema) => {
		setIsSubmitting(true);

		await toast.promise(updateUser(data), {
			loading: 'Updating your profile...',
			success: 'Profile updated successfully',
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
		<TabsContent value="profile">
			<SettingsTabTitle
				title="Profile"
				subtitle="Manage your personal information."
			/>
			<form
				className="flex flex-col"
				onSubmit={handleSubmit(onSubmit)}
			>
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
				</FieldGroup>
				<Separator className="my-4" />
				<div className="flex items-center justify-end gap-x-2">
					<Button
						disabled={disabled}
						onClick={() => reset()}
						size="lg"
						variant="secondary"
					>
						Discard changes
					</Button>
					<Button
						disabled={disabled}
						size="lg"
						type="submit"
					>
						Save changes
					</Button>
				</div>
			</form>
		</TabsContent>
	);
};
