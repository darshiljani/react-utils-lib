import { useEffect, useRef } from 'react'

type EventListener = (event: Event) => void

export default function useEventListener(
	eventType: string,
	callback: EventListener,
	element: HTMLElement | Window | Document = window
) {
	const callbackRef = useRef<EventListener>(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		if (!element) return

		const eventListener: EventListener = (event) =>
			callbackRef.current(event)
		element.addEventListener(eventType, eventListener)

		return () => {
			element.removeEventListener(eventType, eventListener)
		}
	}, [eventType, element])
}
