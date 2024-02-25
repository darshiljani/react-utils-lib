import { useCallback, useEffect, useState } from 'react'

type CallbackFunction<T> = () => Promise<T>

type AsyncState<T> = {
	loading: boolean
	error?: Error
	data?: T
}

export default function useAsync<T>(
	callback: CallbackFunction<T>,
	dependencies: React.DependencyList = []
): AsyncState<T> {
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | undefined>()
	const [data, setData] = useState<T | undefined>()

	const callbackMemoized = useCallback(() => {
		setLoading(true)
		setError(undefined)
		setData(undefined)
		callback()
			.then(setData)
			.catch((error: Error) => setError(error))
			.finally(() => setLoading(false))
	}, dependencies)

	useEffect(() => {
		callbackMemoized()
	}, [callbackMemoized])

	return { loading, error, data }
}
