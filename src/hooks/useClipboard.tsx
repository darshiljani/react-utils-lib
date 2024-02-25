import { useState } from 'react'

const useClipboard = (): [string[], (text: string) => void] => {
	const MAX_HISTORY_LENGTH = 5

	const [copiedTexts, setCopiedTexts] = useState<string[]>(
		Array(MAX_HISTORY_LENGTH).fill('')
	)
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	const copyToClipboard = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopiedTexts((prevCopiedTexts) => {
					const newCopiedTexts = [...prevCopiedTexts]
					newCopiedTexts[currentIndex] = text
					setCurrentIndex((currentIndex + 1) % MAX_HISTORY_LENGTH)
					return newCopiedTexts
				})
			})
			.catch((error) => {
				console.error('Error copying to clipboard:', error)
			})
	}

	return [copiedTexts, copyToClipboard]
}

export default useClipboard
