const isValidDate = (date: Date): boolean => {
	return !Number.isNaN(date.getTime());
};

const startOfDay = (date: Date): Date => {
	const result = new Date(date);
	result.setHours(0, 0, 0, 0);

	return result;
};

const isSameDay = (a: Date, b: Date): boolean => {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

const addDays = (date: Date, days: number): Date => {
	const result = new Date(date);
	result.setDate(result.getDate() + days);

	return result;
};

const parseDate = (value: string | Date): Date | null => {
	if (value instanceof Date) {
		return isValidDate(value) ? value : null;
	}

	// Handle date-only strings such as "2026-08-19" in local time.
	// new Date("2026-08-19") is interpreted as UTC and can shift the
	// displayed day depending on the user's timezone.
	const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

	if (dateOnlyMatch) {
		const [, year, month, day] = dateOnlyMatch;

		const date = new Date(Number(year), Number(month) - 1, Number(day));

		return isValidDate(date) ? date : null;
	}

	const date = new Date(value);

	return isValidDate(date) ? date : null;
};

export const mapDateToClient = (value: string | Date | null | undefined): string => {
	if (!value) {
		return 'No date';
	}

	const date = parseDate(value);

	if (!date) {
		return 'Invalid date';
	}

	const today = startOfDay(new Date());
	const target = startOfDay(date);

	if (isSameDay(target, today)) {
		return 'Today';
	}

	if (isSameDay(target, addDays(today, 1))) {
		return 'Tomorrow';
	}

	if (isSameDay(target, addDays(today, -1))) {
		return 'Yesterday';
	}

	const isCurrentYear = target.getFullYear() === today.getFullYear();

	return target.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		...(isCurrentYear ? {} : { year: 'numeric' }),
	});
};
