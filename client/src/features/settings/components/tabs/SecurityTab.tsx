'use client';

import { Button } from '@/shared/ui/button';
import { TabsContent } from '@/shared/ui/tabs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader, Send } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { deleteAccount } from '../../api/deleteAccount';
import { getAccount } from '../../api/getAccount';
import { getLink } from '../../api/getLink';
import { SettingsTabTitle } from '../SettingsTabTitle';

interface Props {
	className?: string;
}

export const SecurityTab: React.FC<Props> = ({}) => {
	const queryClient = useQueryClient();

	const [isGeneratingLink, setIsGeneratingLink] = React.useState(false);

	useEffect(() => {
		if (!isGeneratingLink) {
			return;
		}

		const timeout = setTimeout(() => {
			setIsGeneratingLink(false);
		}, 15000);

		return () => clearTimeout(timeout);
	}, [isGeneratingLink]);

	const { data } = useQuery({
		queryKey: ['account'],
		queryFn: getAccount,
		refetchInterval: _ => {
			if (!isGeneratingLink || isConnected) {
				return false;
			}

			return 1_000;
		},
	});

	const { mutateAsync: disconnectAccount } = useMutation({
		mutationKey: ['account'],
		mutationFn: deleteAccount,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['account'],
			});
		},
	});

	const { mutate: generateLink } = useMutation({
		mutationFn: getLink,
		onSuccess: async data => {
			window.open(data.link, '_blank');
			setIsGeneratingLink(true);
		},
		onError() {
			toast.error('Something went wrong while generating a link. Try again');
		},
	});

	const handleDisconnect = () => {
		toast.promise(disconnectAccount, {
			loading: 'Disconnecting your account...',
			success: 'Your account is successfully disconnected',
			error: 'Something went wrong. Please try again',
		});
	};

	const telegramUsername = data?.data?.telegram_username;
	const isConnected = Boolean(telegramUsername);

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

							{isConnected ? (
								<p className="text-sm text-muted-foreground">
									Connected to <span className="font-medium text-foreground">@{telegramUsername}</span>
								</p>
							) : (
								<p className="text-sm text-muted-foreground">
									Connect your Telegram account to use Nexus from Telegram.
								</p>
							)}
						</div>
					</div>

					{isConnected ? (
						<Button
							onClick={() => handleDisconnect()}
							size="lg"
							variant="destructive"
						>
							Disconnect
						</Button>
					) : (
						<Button
							size="lg"
							disabled={isGeneratingLink}
							onClick={() => generateLink()}
						>
							{isGeneratingLink ? (
								<span className="flex items-center gap-x-1.5">
									<Loader className="size-4 animate-spin" />
									Connecting...
								</span>
							) : (
								<span>Connect Telegram</span>
							)}
						</Button>
					)}
				</div>
			</div>
		</TabsContent>
	);
};
