import { useEffect, useState } from 'react'

export default function useMediaQuery(mediaQuery: string): boolean {
	const [isMatch, setIsMatch] = useState<boolean>(false)
	const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(
		null
	)

	useEffect(() => {
		const list = window.matchMedia(mediaQuery)
		setMediaQueryList(list)
		setIsMatch(list.matches)
	}, [mediaQuery])

	useEffect(() => {
		if (mediaQueryList) {
			const listener = (e: MediaQueryListEvent) => setIsMatch(e.matches)
			mediaQueryList.addEventListener('change', listener)
			return () => mediaQueryList.removeEventListener('change', listener)
		}
	}, [mediaQueryList])

	return isMatch
}
