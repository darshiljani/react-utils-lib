export const checkSameLength = (arrays: Array<unknown[]>) => {
	return arrays.every((arr) => arr.length === arrays[0]?.length)
}

export const getUniqueValues = <T>(array: Array<T>): Array<T> => {
	return [...new Set(array)]
}
