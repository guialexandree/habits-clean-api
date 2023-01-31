import { DateValidator } from '@/validation/protocols'
import { DateStartOf, DateStartToday } from '@/data/protocols'

export class DateValidatorAdapterSpy implements DateValidator {
	date: string
	result = true

	isValid (date: string): boolean {
		this.date = date
		return this.result
	}
}

export class DateStartTodayAdapterSpy implements DateStartToday {
	result = new Date(2023, 1, 1)

	startOfToday (): Date {
		return this.result
	}
}

export class DateStartOfAdapterSpy implements DateStartOf {
	date: string
	result = new Date()

	startOf (date: string): Date {
		this.date = date
		return this.result
	}
}
