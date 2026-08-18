'use client';

import { getQueryClient } from '@/lib/getQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@teispace/next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	// const initialize = useAuthStore(state => state.initialize);
	// const isInitialized = useAuthStore(state => state.isInitialized);

	// useEffect(() => {
	// 	initialize();
	// }, [initialize]);

	// if (!isInitialized) {
	// 	return (
	// 		<div className="flex min-h-screen items-center justify-center">
	// 			<Loader2 className="size-6 animate-spin text-muted-foreground" />
	// 		</div>
	// 	);
	// }

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				{children}
			</QueryClientProvider>
		</ThemeProvider>
	);
}
