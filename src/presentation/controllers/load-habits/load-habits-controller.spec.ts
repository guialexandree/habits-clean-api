import { LoadHabitsController } from './load-habits-controller'
import { ValidationSpy } from '@/presentation/test'
import { badRequest } from '@/presentation/helpers'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadHabitsController.Request => ({
	date: faker.date.recent().toISOString()
})

type SutTypes = {
	sut: LoadHabitsController
	validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy()
	const sut = new LoadHabitsController(validationSpy)

	return {
		sut,
		validationSpy
	}
}

describe('AddHabit Controller', () => {
	beforeAll(() => {
		MockDate.set(new Date())
	})

	afterAll(() => {
		MockDate.reset()
	})

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
})
