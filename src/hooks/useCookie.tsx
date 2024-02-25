import { useCallback, useState } from 'react'

type CookieOptions = {
	expires?: number // Number of days until the cookie expires
	path?: string // Path for the cookie
}

const formatCookieOptions = (options: CookieOptions): string => {
	let cookieOptions = ''
	if (options.expires) {
		const expires = new Date()
		expires.setTime(
			expires.getTime() + options.expires * 24 * 60 * 60 * 1000
		)
		cookieOptions += `;expires=${expires.toUTCString()}`
	}
	if (options.path) {
		cookieOptions += `;path=${options.path}`
	}
	return cookieOptions
}

const useCookie = (
	cookieName: string
): [
	string | undefined,
	(value: string, options?: CookieOptions) => void,
	() => void,
] => {
	const getCookie = useCallback((): string | undefined => {
		try {
			const decodedCookie = decodeURIComponent(document.cookie)
			const cookies = decodedCookie
				.split(';')
				.map((cookie) => cookie.trim())
			for (const cookie of cookies) {
				const [name, value] = cookie.split('=')
				if (name === cookieName) {
					return decodeURIComponent(value)
				}
			}
		} catch (error) {
			console.error('Error getting cookie:', error)
		}
		return undefined
	}, [cookieName])

	const [cookieValue, setCookieValue] = useState<string | undefined>(
		getCookie
	)

	const updateCookie = useCallback(
		(value: string, options?: CookieOptions) => {
			try {
				const cookieOptions = options
					? formatCookieOptions(options)
					: ''
				document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(value)}${cookieOptions}`
				setCookieValue(value)
			} catch (error) {
				console.error('Error updating cookie:', error)
			}
		},
		[cookieName]
	)

	const removeCookie = useCallback(() => {
		try {
			document.cookie = `${encodeURIComponent(cookieName)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
			setCookieValue(undefined)
		} catch (error) {
			console.error('Error removing cookie:', error)
		}
	}, [cookieName])

	return [cookieValue, updateCookie, removeCookie]
}

export default useCookie
