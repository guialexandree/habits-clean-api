import { DateStartOf, DateStartToday, DateWeekDay } from '@/data/protocols'
import faker from 'faker'

export class DateStartTodayAdapterSpy implements DateStartToday {
	result = new Date(2023, 1, 1)

	startOfToday (): Date {
		return this.result
	}
}

export class DateStartOfAdapterSpy implements DateStartOf {
	date: string
	result = new Date(2023, 1, 1)

	startOf (date: string): Date {
		this.date = date
		return this.result
	}
}

export class DateWeekDayAdapterSpy implements DateWeekDay {
	date: Date
	result = faker.datatype.number({ max: 6 })

	weekDay (date: Date): number {
		this.date = date
		return this.result
	}
}
