import { Validation } from '@/presentation/protocols'
import { DateFieldValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeLoadHabitsValidation } from '@/main/factories/controllers'

jest.mock('@/validation/validators/validation-composite/validation-composite')

describe('LoadHabitsValidation Factory', () => {
  test('Deve chamar ValidationComposite com as validações corretas', () => {
    makeLoadHabitsValidation()
    const validations: Validation[] = []

    for (const field of ['date']) {
      validations.push(new RequiredFieldValidation(field))
    }

		validations.push(new DateFieldValidation('date'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
