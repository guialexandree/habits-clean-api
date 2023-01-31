import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeToggleDayHabitValidation } from '@/main/factories/controllers'

jest.mock('@/validation/validators/validation-composite/validation-composite')

describe('LoadHabitsValidation Factory', () => {
  test('Deve chamar ValidationComposite com as validações corretas', () => {
    makeToggleDayHabitValidation()
    const validations: Validation[] = []

    for (const field of ['habitId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
