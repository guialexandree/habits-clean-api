import { DateStartToday, DateStartOf } from '@/data/protocols'
import { DateValidator } from '@/validation/protocols'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export class DateAdapter implements DateValidator, DateStartToday, DateStartOf {
	isValid (date: string): boolean {
		return dayjs(date).isValid()
	}

	startOfToday (): Date {
		return dayjs().startOf('day').toDate()
	}

	startOf (date: string): Date {
		return dayjs(date).startOf('day').toDate()
	}
}
