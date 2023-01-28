import { Validation } from '@/presentation/protocols'
import { RequiredArrayValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeAddHabitValidation } from '@/main/factories/controllers'

jest.mock('@/validation/validators/validation-composite/validation-composite')

describe('AddHabitValidation Factory', () => {
  test('Deve chamar ValidationComposite com as validações corretas', () => {
    makeAddHabitValidation()
    const validations: Validation[] = []

    for (const field of ['title']) {
      validations.push(new RequiredFieldValidation(field))
    }

		validations.push(new RequiredArrayValidation('weekDays'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
