import React from 'react';

interface Props {
	title: string;
	children?: React.ReactNode;
}
export const Title: React.FC<Props> = ({ title, children }) => {
	return (
		<div className="border-border flex w-full items-center justify-between border-b pb-3 pl-1 pr-">
			<span className="text-foreground font-heading text-4xl font-semibold">{title}</span>
			{children}
		</div>
	);
};
