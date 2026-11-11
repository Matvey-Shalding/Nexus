export function isValidValue<T extends Record<string, string>>(value: string, constObject: T): value is T[keyof T] {
	return Object.values(constObject).includes(value);
}
