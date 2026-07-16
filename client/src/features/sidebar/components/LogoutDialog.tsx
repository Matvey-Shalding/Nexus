'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import React from 'react';
import { useLogout } from '../hooks/useLogout';

interface Props {
	className?: string;
	isDialogOpen: boolean;
	setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogoutDialog: React.FC<Props> = ({ isDialogOpen, setIsDialogOpen }) => {
	const { isLoggingOut, handleLogout } = useLogout();

	return (
		<AlertDialog
			open={isDialogOpen}
			onOpenChange={setIsDialogOpen}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Ready to leave?</AlertDialogTitle>

					<AlertDialogDescription>
						You'll be signed out of Nexus on this device. Your notes and workspace will remain safely saved.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={isLoggingOut}
						onClick={() => handleLogout()}
					>
						Log out
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
