import { cn } from '@/lib/utils';
import { CircleUserRoundIcon } from 'lucide-react';
import React from 'react';
import { Button } from './button';
interface Props {
	className?: string;
	iconClassName?: string;
}
export const Avatar: React.FC<Props> = ({ className, iconClassName }) => {
	return (
		<Button className={cn('size-8 rounded-xl', className)}>
			<CircleUserRoundIcon className={cn('text-foreground! size-5', iconClassName)} />
		</Button>
	);
};
