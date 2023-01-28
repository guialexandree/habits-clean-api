import { BadlyFormattedParamError } from '@/presentation/errors'
import { DateFieldValidation } from '@/validation/validators'
import { DateValidatorSpy } from '@/validation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
	sut: DateFieldValidation
	dateValidatorSpy: DateValidatorSpy
}

const makeSut = (): SutTypes => {
	const dateValidatorSpy = new DateValidatorSpy()
  const sut = new DateFieldValidation(field, dateValidatorSpy)

	return {
		sut,
		dateValidatorSpy
	}
}

describe('RequiredField Validation', () => {
  test('Deve retornar BadlyFormattedParamError se a validação falhar', () => {
    const { sut, dateValidatorSpy } = makeSut()
		dateValidatorSpy.isDateValid = false

    const error = sut.validate({ [field]: faker.random.word() })

		expect(error).toEqual(new BadlyFormattedParamError(field, 'Invalid format date, expected YYYY-MM-DD'))
	})

  test('Deve retornar null se a validação ocorrer com sucesso', () => {
    const { sut } = makeSut()

    const error = sut.validate({ [field]: faker.date.recent().toISOString() })

    expect(error).toBeFalsy()
  })

	test('Deve progagar o erro se DateValidator lançar exceção', () => {
    const { sut, dateValidatorSpy } = makeSut()
    jest
			.spyOn(dateValidatorSpy, 'isValid')
			.mockImplementationOnce(throwError)

    expect(sut.validate).toThrow()
  })
})
