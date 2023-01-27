import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeHabitValidation } from '@/main/factories/controllers'

jest.mock('@/validation/validators/validation-composite/validation-composite')

describe('HabitValidation Factory', () => {
  test('Deve chamar ValidationComposite com as validações corretas', () => {
    makeHabitValidation()
    const validations: Validation[] = []

    for (const field of ['title', 'weekDays']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
