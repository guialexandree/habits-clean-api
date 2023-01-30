import { BadlyFormattedParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class DateFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
		const regex = /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/
    if (!regex.test(input[this.fieldName])) {
      return new BadlyFormattedParamError(
				this.fieldName,
				'Invalid format date, expected YYYY-MM-DD'
			)
    }

    return null
  }
}
