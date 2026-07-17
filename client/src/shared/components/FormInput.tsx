'use client';

import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { InputGroup, InputGroupInput } from '@/shared/ui/input-group';
import { ComponentProps, ReactNode } from 'react';

import type { Control, FieldValues, Path } from 'react-hook-form';

import { Controller } from 'react-hook-form';

interface Props<T extends FieldValues> extends ComponentProps<typeof Input> {
	fieldName: Path<T>;
	control: Control<T>;
	label: string;
	children?: ReactNode; // adornment
}

export function FormInput<T extends FieldValues>({ fieldName, control, label, children, ...inputProps }: Props<T>) {
	{
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
							/>
							{children}
						</InputGroup>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
		);
	}
}
