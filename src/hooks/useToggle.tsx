import { useState } from 'react'

export default function useToggle(initialValue: boolean) {
	const [value, setValue] = useState<boolean>(initialValue)

	const toggle = () => {
		setValue((currentValue) => !currentValue)
	}
	return [value, toggle]
}
