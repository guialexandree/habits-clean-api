import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  test('Deve retornar MissingParamError se a validação falhar', () => {
    const sut = makeSut()

    const error = sut.validate({ invalidField: faker.random.word() })

		expect(error).toEqual(new MissingParamError(field))
	})

  test('Deve retornar null se a validação ocorrer com sucesso', () => {
    const sut = makeSut()

    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toBeFalsy()
  })
})
