import { BadlyFormattedParamError } from '@/presentation/errors'
import { DateFieldValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
	sut: DateFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new DateFieldValidation(field)

	return {
		sut
	}
}

describe('RequiredField Validation', () => {
  test('Deve retornar BadlyFormattedParamError se a validação falhar', () => {
    const { sut } = makeSut()

    const error = new BadlyFormattedParamError(field, 'Invalid format date, expected YYYY-MM-DD')
		expect(sut.validate({ [field]: faker.random.word() })).toEqual(error)
		expect(sut.validate({ [field]: '22-12-2021' })).toEqual(error)
		expect(sut.validate({ [field]: '2023-21-21' })).toEqual(error)
	})

  test('Deve retornar null se a validação ocorrer com sucesso', () => {
    const { sut } = makeSut()

    const error = sut.validate({ [field]: '2023-01-21' })

    expect(error).toBeFalsy()
  })
})
