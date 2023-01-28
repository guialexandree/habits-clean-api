import { DateValidator } from '@/validation/protocols'

export class DateValidatorAdapter implements DateValidator {
	isValid (date: string): boolean {
		const regex = /^\d{4}[\\-](0?[1-9]|1[012])[\\-](0?[1-9]|[12][0-9]|3[01])$/
    return regex.test(date)
  }
}
