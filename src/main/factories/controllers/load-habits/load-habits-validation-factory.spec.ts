import { Validation } from '@/presentation/protocols'
import { DateFieldValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeLoadHabitsValidation } from '@/main/factories/controllers'
import { DateValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite/validation-composite')

describe('LoadHabitsValidation Factory', () => {
  test('Deve chamar ValidationComposite com as validações corretas', () => {
    makeLoadHabitsValidation()
    const validations: Validation[] = []

    for (const field of ['date']) {
      validations.push(new RequiredFieldValidation(field))
    }

		validations.push(new DateFieldValidation('date', new DateValidatorAdapter()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
