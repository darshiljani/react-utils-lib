/* eslint-disable indent */
import dayjs, { UnitType } from 'dayjs'

type ComparisonType = 'before' | 'after' | 'same'

export const toIsoDateString = (date: string | Date) => {
	return dayjs(date)?.format('YYYY-MM-DD')
}

export const toIsoDateTimeString = (datetime: string | Date) => {
	return dayjs(datetime)?.format('YYYY-MM-DD HH:mm')
}

export const toSlashDateString = (date: string | Date) => {
	return dayjs(date).format('YYYY/MM/DD')
}

export const toSlashDateTimeString = (date: string | Date) => {
	return dayjs(date).format('YYYY/MM/DD HH:mm')
}

export const toSlashDateTimeSecondString = (date: string | Date) => {
	return dayjs(date).format('YYYY/MM/DD HH:mm:ss')
}

export const getTimestamp = (date: string | Date) => {
	return dayjs(date)?.unix()
}

export const serializeDateToIso = (date: string | Date) => {
	return dayjs(date)?.toJSON()
}

export const compareDates = (
	dateA: Date | string | undefined,
	dateB: Date | string | undefined,
	type: ComparisonType,
	unit: UnitType
): boolean => {
	if (dateA === undefined || dateB === undefined) {
		return false
	}
	switch (type) {
		case 'after':
			return dayjs(dateA).isAfter(dateB, unit)
		case 'before':
			return dayjs(dateA).isBefore(dateB, unit)
		case 'same':
			return dayjs(dateA).isSame(dateB, unit)
		default:
			return false
	}
}
