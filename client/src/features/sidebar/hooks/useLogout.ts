import { logout, useAuthStore } from '@/features/auth';
import { Routes } from '@/shared/config/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useLogout = () => {
	const router = useRouter();

	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const { clearAccessToken } = useAuthStore();

	const handleLogout = async () => {
		setIsLoggingOut(true);

		toast.promise(logout, {
			loading: 'Logging out...',
			success: () => {
				clearAccessToken();
				router.push(Routes.LOGIN);
				return 'Logged out successfully';
			},
			error: 'Something went wrong. Please try again.',
			finally: () => {
				setIsLoggingOut(false);
			},
		});
	};

	return {
		isLoggingOut,
		handleLogout,
	};
};
