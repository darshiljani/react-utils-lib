import { useState } from 'react'

export default function useArray<T>(initialValue: Array<T>) {
	const [array, setArray] = useState(initialValue)

	const add = (element: T) => {
		setArray((arr) => [...arr, element])
	}

	const filter = (callback: () => void) => {
		setArray((arr) => arr.filter(callback))
	}

	function update(index: number, newElement: T) {
		setArray((a) => [
			...a.slice(0, index),
			newElement,
			...a.slice(index + 1, a.length),
		])
	}

	const remove = (index: number) => {
		const newArray = (() => {
			if (index < 0 || index >= array.length) {
				return array
			}
			const tmpArray = [...array]
			tmpArray.splice(index, 1)
			return tmpArray
		})()
		setArray(newArray)
	}

	const clear = () => {
		setArray([])
	}

	return { array, set: setArray, add, update, filter, remove, clear }
}
