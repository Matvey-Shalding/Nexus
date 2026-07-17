import { Separator } from '@/shared/ui/separator'
import React from 'react';

interface Props {
	className?: string;
	title: string;
	subtitle: string;
}

export const SettingsTabTitle: React.FC<Props> = ({ title, subtitle }) => {
	return (
		<>
			<div className="space-y-1">
				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-muted-foreground text-sm">{subtitle}</p>
			</div>
			<Separator className="my-2" />
		</>
	);
};
