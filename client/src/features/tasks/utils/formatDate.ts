export const formatDate = (dateStr: string | null) => {
	if (!dateStr) {
		return 'No date';
	}

	try {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	} catch (error) {
		return 'Invalid date';
	}
};
