import { cn } from '@/lib/utils'

export function Logo({classname}:{classname?:string}) {
	return (
		<img
			className={cn('mx-auto',classname)}
			src="/assets/logo.svg"
			alt="logo"
		/>
	);
}
