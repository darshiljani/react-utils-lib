export const strToBool = (
	value: string | undefined | null
): boolean | undefined => {
	if (value === 'true') return true
	if (value === 'false') return false
	return undefined
}

export const strToNum = (
	value: string | undefined | null
): number | undefined => {
	if (value === undefined || value === null) {
		return undefined
	}
	const num = parseInt(value)
	if (isNaN(num)) {
		return undefined
	}
	return num
}
