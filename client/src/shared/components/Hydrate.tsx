import { queryClient } from '@/lib/reactQueryClient';
import { DehydratedState, HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
interface Props {
	state: DehydratedState;
	children: React.ReactNode;
}
export const Hydrate: React.FC<Props> = ({ children, state }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={state}>{children}</HydrationBoundary>
		</QueryClientProvider>
	);
};
