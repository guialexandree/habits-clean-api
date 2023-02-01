import { DateStartOf, DateStartToday } from '@/data/protocols'

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
