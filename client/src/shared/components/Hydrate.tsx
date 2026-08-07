'use client';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import React from 'react';

interface Props {
	state: DehydratedState;
	children: React.ReactNode;
}

export const Hydrate: React.FC<Props> = ({ children, state }) => {
	return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
};
