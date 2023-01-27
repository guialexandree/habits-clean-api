import { MissingParamError } from '@/presentation/errors'
import { RequiredArrayValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

const makeSut = (fieldName: string = field): RequiredArrayValidation => {
  return new RequiredArrayValidation(fieldName)
}

describe('RequiredArray Validation', () => {
  test('Deve retornar MissingParamError se weekDays estiver vazio', () => {
    const sut = makeSut('weekDays')

    const error = sut.validate({
			title: faker.random.word(),
			weekDays: []
		})

		expect(error).toBeTruthy()
		expect(error).toEqual(new MissingParamError('weekDays'))
	})

  test('Deve retornar null se a validação ocorrer com sucesso', () => {
    const sut = makeSut()

    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toBeFalsy()
  })
})
