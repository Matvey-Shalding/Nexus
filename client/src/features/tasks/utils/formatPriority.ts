import { TPriority } from '../types/Priority';

export const formatPriority = (priority: TPriority) => {
	switch (priority) {
		case 1:
			return 'Low';
		case 2:
			return 'Medium';
		case 3:
			return 'High';
		case 0:
			return 'Default';

		default:
			return 'Invalid priority';
	}
};
