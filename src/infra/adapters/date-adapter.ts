import { DateStartToday, DateStartOf, DateWeekDay } from '@/data/protocols'
import { DateValidator } from '@/validation/protocols'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export class DateAdapter implements DateValidator, DateStartToday, DateStartOf, DateWeekDay {
	isValid (date: string): boolean {
		return dayjs(date).isValid()
	}

	startOfToday (): Date {
		return dayjs().startOf('day').toDate()
	}

	startOf (date: string): Date {
		return dayjs(date).startOf('day').toDate()
	}

	weekDay (date: Date): number {
		return dayjs(date).get('day')
	}
}
