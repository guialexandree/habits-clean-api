import { LoadHabitsController } from './load-habits-controller'
import { DbLoadHabitsSpy, ValidationSpy } from '@/presentation/test'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import MockDate from 'mockdate'
import faker from 'faker'
import { throwError } from '@/domain/test'

const mockRequest = (): LoadHabitsController.Request => ({
	date: faker.date.recent().toISOString()
})

type SutTypes = {
	sut: LoadHabitsController
	validationSpy: ValidationSpy
	dbLoadHabitsSpy: DbLoadHabitsSpy
}

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy()
	const dbLoadHabitsSpy = new DbLoadHabitsSpy()
	const sut = new LoadHabitsController(validationSpy, dbLoadHabitsSpy)

	return {
		sut,
		validationSpy,
		dbLoadHabitsSpy
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

	test('Deve chamar LoadHabits com a data correta', async () => {
    const { sut, dbLoadHabitsSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(dbLoadHabitsSpy.dateParams.toISOString()).toBe(request.date)
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

	test('Deve retornar status 202 com a lista de hábitos', async () => {
    const { sut, dbLoadHabitsSpy } = makeSut()

    const response = await sut.handle(mockRequest())

    expect(response).toEqual(ok(dbLoadHabitsSpy.result))
  })
})
