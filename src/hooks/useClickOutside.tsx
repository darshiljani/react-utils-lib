import { RefObject } from 'react'
import useEventListener from './useEventListener'

export default function useClickOutside(
	ref: RefObject<Element>,
	cb: (event: MouseEvent) => void
): void {
	const handleClickOutside = (e: Event) => {
		if (!ref.current || ref.current.contains(e.target as Node)) return
		cb(e as MouseEvent)
	}

	useEventListener('click', handleClickOutside, document)
}
