import { ToggleDayHabitController } from './toggle-day-habit-controller'
import { DbCheckHabitByIdSpy, DbToggleDayHabitSpy, ValidationSpy } from '@/presentation/test'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): ToggleDayHabitController.Request => ({
	habitId: faker.datatype.uuid()
})

type SutTypes = {
	sut: ToggleDayHabitController
	validationSpy: ValidationSpy
	dbToggleDayHabitSpy: DbToggleDayHabitSpy
	dbcheckHabitByIdSpy: DbCheckHabitByIdSpy
}

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy()
	const dbToggleDayHabitSpy = new DbToggleDayHabitSpy()
	const dbcheckHabitByIdSpy = new DbCheckHabitByIdSpy()
	const sut = new ToggleDayHabitController(validationSpy, dbToggleDayHabitSpy, dbcheckHabitByIdSpy)

	return {
		sut,
		validationSpy,
		dbToggleDayHabitSpy,
		dbcheckHabitByIdSpy
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
    const { sut, dbToggleDayHabitSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(dbToggleDayHabitSpy.habitId).toBe(request.habitId)
  })

	test('Deve chamar CheckHabitById com o habitId correto', async () => {
    const { sut, dbcheckHabitByIdSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(dbcheckHabitByIdSpy.habitId).toBe(request.habitId)
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

	test('Deve retornar status 204 ao processar com sucesso', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(mockRequest())

    expect(response).toEqual(ok(null))
  })
})
