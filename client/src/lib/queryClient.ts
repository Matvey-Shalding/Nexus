import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60000,
			refetchOnWindowFocus: false,
			// Explicitly type error as 'any' to bypass strict TS checking for the Axios wrapper
			retry: (failureCount: number, error: any) => {
				if (error?.response?.status === 401 || error?.response?.status === 403) {
					return false; // Instantly abort retries on auth failures
				}
				return failureCount < 3;
			},
		},
	},
});
