export const mapDateToClient = (date: string | Date | null | undefined): string => {
	if (!date) {
		return 'No date';
	}

	let formattedDate: Date | null = null;

	if (typeof date === 'string') {
		try {
			formattedDate = new Date(date);
		} catch (error) {
			return 'Invalid date';
		}
	} else {
		formattedDate = date;
	}

	return formattedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
