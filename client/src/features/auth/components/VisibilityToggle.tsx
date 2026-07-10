import React, { Dispatch, SetStateAction } from 'react';

import { Eye,EyeOff } from 'lucide-react';

interface Props {
	className?: string;
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>
}

export const VisibilityToggle: React.FC<Props> = ({isVisible,setIsVisible}) => {
	return (
		<button onClick={() => setIsVisible(!isVisible)}>
			{isVisible ? (
				<Eye className="h-4.5 w-4.5" />
			) : (
				<EyeOff className="h-4.5 w-4.5" />
			)}
		</button>
	);
};
