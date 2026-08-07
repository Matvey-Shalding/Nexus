// src/app/providers.tsx
'use client';

import { getQueryClient } from '@/lib/getQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
	// Get the request-scoped or browser client
	const queryClient = getQueryClient();

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
