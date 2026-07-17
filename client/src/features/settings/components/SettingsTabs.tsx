import { TabsList, TabsTrigger } from '@/shared/ui/tabs';
import React from 'react';
import { tabs } from '../config/settingsTabs';
interface Props {
	className?: string;
}
export const SettingsTabs: React.FC<Props> = ({}) => {
	return (
		<TabsList className="bg-muted/30 block h-full! min-h-full! w-55 self-stretch rounded-none! border-r p-3">
			<div className="flex flex-col gap-1">
				{tabs.map(tab => {
					const Icon = tab.icon;

					return (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="data-[state=active]:bg-background w-full justify-start gap-2.5 px-3 py-2.5 text-sm font-medium data-[state=active]:shadow-sm"
						>
							<Icon className="size-4" />
							{tab.label}
						</TabsTrigger>
					);
				})}
			</div>
		</TabsList>
	);
};
