import { useEffect, useState } from 'react'

type PositionError = {
	code: number
	message: string
}

type PositionData = {
	coords: {
		latitude: number
		longitude: number
		altitude: number | null
		accuracy: number
		altitudeAccuracy: number | null
		heading: number | null
		speed: number | null
	}
	timestamp: number
}

type GeolocationOptions = {
	enableHighAccuracy?: boolean
	timeout?: number
	maximumAge?: number
}

type GeolocationState = {
	loading: boolean
	error?: PositionError
	data?: PositionData
}

export default function useGeolocation(
	options?: GeolocationOptions
): GeolocationState {
	const [state, setState] = useState<GeolocationState>({
		loading: true,
		error: undefined,
		data: undefined,
	})

	useEffect(() => {
		const successHandler = (position: GeolocationPosition) => {
			const { coords, timestamp } = position
			setState({
				loading: false,
				error: undefined,
				data: { coords, timestamp },
			})
		}

		const errorHandler = (error: GeolocationPositionError) => {
			setState({
				loading: false,
				error: { code: error.code, message: error.message },
				data: undefined,
			})
		}

		navigator.geolocation.getCurrentPosition(
			successHandler,
			errorHandler,
			options
		)

		const watchId = navigator.geolocation.watchPosition(
			successHandler,
			errorHandler,
			options
		)

		return () => {
			navigator.geolocation.clearWatch(watchId)
		}
	}, [options])

	return state
}
