import { useEffect, useRef, useState } from 'react'

export default function useHover(ref: React.RefObject<HTMLElement>): boolean {
	const [hovered, setHovered] = useState(false)
	const callbackRef = useRef<EventListener>(() => {})

	useEffect(() => {
		const handleMouseOver = () => setHovered(true)
		const handleMouseOut = () => setHovered(false)

		callbackRef.current = (event: Event) => {
			if (event.type === 'mouseover') handleMouseOver()
			if (event.type === 'mouseout') handleMouseOut()
		}
	}, [])

	useEffect(() => {
		if (!ref.current) return

		const element = ref.current

		const onMouseOver = (event: Event) => callbackRef.current(event)
		const onMouseOut = (event: Event) => callbackRef.current(event)

		element.addEventListener('mouseover', onMouseOver)
		element.addEventListener('mouseout', onMouseOut)

		return () => {
			element.removeEventListener('mouseover', onMouseOver)
			element.removeEventListener('mouseout', onMouseOut)
		}
	}, [ref])

	return hovered
}
