'use client';

import { Button } from '@/shared/ui/button';
import { TabsContent } from '@/shared/ui/tabs';
import { Loader, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { getLink } from '../../api/getLink';
import { SettingsTabTitle } from '../SettingsTabTitle';

interface Props {
	className?: string;
}

export const SecurityTab: React.FC<Props> = ({}) => {
	const [isLoading, setIsLoading] = React.useState(false);

	const router = useRouter();

	const handleClick = async () => {
		try {
			setIsLoading(true);
			const link = await getLink();
			router.push(link.link);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<TabsContent
			value="security"
			className="space-y-6"
		>
			<SettingsTabTitle
				title="Security"
				subtitle="Manage account security options."
			/>

			<div className="rounded-xl border bg-card p-5">
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted">
							<Send className="size-5" />
						</div>

						<div>
							<h3 className="font-medium">Telegram</h3>
							<p className="text-sm text-muted-foreground">Connect your Telegram account to use Nexus from Telegram.</p>
						</div>
					</div>

					<Button
						disabled={isLoading}
						onClick={handleClick}
					>
						{isLoading ? (
							<span className="flex items-center gap-x-1.5">
								<Loader className="size-4 animate-spin" />
								Connecting...
							</span>
						) : (
							<span>Connect telegram</span>
						)}
					</Button>
				</div>
			</div>
		</TabsContent>
	);
};
