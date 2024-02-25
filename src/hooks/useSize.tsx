import { RefObject, useEffect, useState } from 'react'

export default function useSize(
	ref: RefObject<Element>
): DOMRectReadOnly | undefined {
	const [size, setSize] = useState<DOMRectReadOnly | undefined>(undefined)

	useEffect(() => {
		if (!ref.current) return

		const observer = new ResizeObserver(([entry]) =>
			setSize(entry.contentRect)
		)
		observer.observe(ref.current)

		return () => observer.disconnect()
	}, [ref])

	return size
}
