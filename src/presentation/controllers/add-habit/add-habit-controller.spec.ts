import { ValidationSpy } from '@/presentation/test'
import { AddHabitController } from './add-habit-controller'
import { badRequest, serverError } from '@/presentation/helpers'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): AddHabitController.Request => {
  return {
    title: faker.random.words(5),
		weekDays: [2, 4, 0]
  }
}

type SutTypes = {
	sut: AddHabitController
	validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy()
	const sut = new AddHabitController(validationSpy)

	return {
		sut,
		validationSpy
	}
}

describe('AddHabit Controller', () => {
	test('Deve chamar Validation com os valores corretos', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(validationSpy.input).toEqual(request)
  })

	test('Deve retornar status 400 se Validation falhar', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

	test('Deve retornar status 500 se Validation lançar exceção', async () => {
    const { sut, validationSpy } = makeSut()
    jest
      .spyOn(validationSpy, 'validate')
      .mockImplementationOnce(throwError)

    const response = await sut.handle(mockRequest())

    expect(response).toEqual(serverError(new Error()))
  })
})
