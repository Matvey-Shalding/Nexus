'use client';

import { getCurrentUser } from '@/features/auth';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/shared/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Avatar } from '../../../shared/ui/avatar';

interface Props {
	className?: string;
	open: boolean;
}

export const UserInfo: React.FC<Props> = ({ className, open }) => {
	const { data: user, isPending } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
		select: data => data.data,
	});

	return (
		<div className={cn('flex items-center gap-2 py-1.5 text-left text-sm', className)}>
			<Avatar className={cn(!open && 'relative -left-0.5')} />
			<div className="grid flex-1 text-left text-sm leading-tight">
				{isPending ? (
					<div className="flex flex-col gap-y-1">
						<Skeleton className="min-h-4.5 w-25" />
						<Skeleton className="min-h-3.5 w-38" />
					</div>
				) : (
					<>
						<span className="truncate font-medium">{user?.name}</span>
						<span className="truncate text-xs">{user?.email}</span>
					</>
				)}
			</div>
		</div>
	);
};
