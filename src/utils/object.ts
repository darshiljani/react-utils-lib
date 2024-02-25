type Obj = Record<string, unknown>

export const getSafeReturnValueFromUnknown = <T>(
	obj: unknown,
	key: string
): T | undefined => {
	if (obj === null || typeof obj !== 'object') {
		return undefined
	}

	const typedObj = obj as { [key: string]: T }
	if (key in typedObj) {
		return typedObj[key]
	}
	return undefined
}

export const deepCompareObjects = (obj1: Obj, obj2: Obj): boolean => {
	if (obj1 === obj2) {
		return true
	}

	if (
		typeof obj1 !== 'object' ||
		typeof obj2 !== 'object' ||
		obj1 === null ||
		obj2 === null
	) {
		return false
	}

	const keys1 = Object.keys(obj1)
	const keys2 = Object.keys(obj2)

	if (keys1.length !== keys2.length) {
		return false
	}

	for (const key of keys1) {
		if (
			!keys2.includes(key) ||
			!deepCompareObjects(obj1[key] as Obj, obj2[key] as Obj)
		) {
			return false
		}
	}

	return true
}
