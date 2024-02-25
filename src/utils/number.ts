export const handleNaN = (
	value: number | undefined,
	defaultValue: number = 0
): number | string | undefined => {
	if (value === undefined || value === null) {
		return undefined
	}
	if (Number.isNaN(value)) {
		return defaultValue
	}
	return value
}
