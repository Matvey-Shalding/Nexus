'use client';

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// 1 minute stale time prevents instant client-side refetches
			// of data that was just generated on the server.
			staleTime: 60 * 1000,
			gcTime: 5 * 60 * 1000,
			refetchOnWindowFocus: false,
		},
	},
});
