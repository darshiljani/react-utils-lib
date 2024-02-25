export const openInNewTab = (url: string | URL, target = '_blank'): void => {
	window.open(url, target)
}

export const openInNewWindow = (
	url: string | URL,
	target = '_blank',
	features = 'popup'
): void => {
	window.open(url, target, features)
}
