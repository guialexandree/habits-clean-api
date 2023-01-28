import { BadlyFormattedParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { DateValidator } from '@/validation/protocols'

export class DateFieldValidation implements Validation {
  constructor (
		private readonly fieldName: string,
		private readonly dateValidator: DateValidator
		) { }

  validate (input: any): Error {
    if (!this.dateValidator.isValid(input[this.fieldName])) {
      return new BadlyFormattedParamError(
				this.fieldName,
				'Invalid format date, expected YYYY-MM-DD'
			)
    }

    return null
  }
}
