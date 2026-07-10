import { cn } from '@/lib/utils';
import { DM_Sans, Geist, Geist_Mono, Noto_Sans } from 'next/font/google';
import './globals.css';
import { appConfig } from '@/shared/config/app'
import { Metadata } from 'next'

const notoSansHeading = Noto_Sans({ subsets: ['latin'], variable: '--font-heading' });

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = appConfig

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
				'h-full',
				'antialiased',
				'dark',
				geistSans.variable,
				geistMono.variable,
				'font-sans',
				dmSans.variable,
				notoSansHeading.variable,
			)}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
