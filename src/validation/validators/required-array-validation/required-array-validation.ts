import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class RequiredArrayValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    if (!input[this.fieldName] || input[this.fieldName].length === 0) {
      return new MissingParamError(this.fieldName)
    }

    return null
  }
}
