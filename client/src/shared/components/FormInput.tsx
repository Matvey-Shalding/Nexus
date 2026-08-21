'use client';

import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { InputGroup, InputGroupInput } from '@/shared/ui/input-group';
import { Eye, EyeOff } from 'lucide-react';
import { ComponentProps, ReactNode, useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface Props<T extends FieldValues> extends ComponentProps<typeof Input> {
	fieldName: Path<T>;
	control: Control<T>;
	label: string;
	showVisibilityToggle?: boolean;
	children?: ReactNode; // adornment
}

export function FormInput<T extends FieldValues>({
	fieldName,
	control,
	label,
	showVisibilityToggle = false,
	children,
	...inputProps
}: Props<T>) {
	const [isVisible, setIsVisible] = useState(false);

	const inputType = isVisible ? 'text' : 'password';

	return (
		<Controller
			name={fieldName}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
					<InputGroup>
						<InputGroupInput
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							{...inputProps}
							{...(showVisibilityToggle && { type: inputType })}
						/>
						{children}
						{showVisibilityToggle && (
							<button
								type="button"
								aria-label={isVisible ? 'Hide password' : 'Show password'}
								onClick={() => setIsVisible(!isVisible)}
								className="mr-1.5 flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							>
								{isVisible ? <Eye className="size-4.5" /> : <EyeOff className="size-4.5" />}
							</button>
						)}
					</InputGroup>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
