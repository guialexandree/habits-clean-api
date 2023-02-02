import { ToggleDayHabitController } from './toggle-day-habit-controller'
import { CheckHabitByIdSpy, ToggleDayHabitSpy, ValidationSpy } from '@/presentation/test'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/domain/test'
import { InvalidParamError } from '@/presentation/errors'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): ToggleDayHabitController.Request => ({
	habitId: faker.datatype.uuid()
})

type SutTypes = {
	sut: ToggleDayHabitController
	validationSpy: ValidationSpy
	toggleDayHabitSpy: ToggleDayHabitSpy
	checkHabitByIdSpy: CheckHabitByIdSpy
}

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy()
	const toggleDayHabitSpy = new ToggleDayHabitSpy()
	const checkHabitByIdSpy = new CheckHabitByIdSpy()
	const sut = new ToggleDayHabitController(validationSpy, toggleDayHabitSpy, checkHabitByIdSpy)

	return {
		sut,
		validationSpy,
		toggleDayHabitSpy,
		checkHabitByIdSpy
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
    const { sut, toggleDayHabitSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(toggleDayHabitSpy.habitId).toBe(request.habitId)
  })

	test('Deve chamar CheckHabitById com o habitId correto', async () => {
    const { sut, checkHabitByIdSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(checkHabitByIdSpy.habitId).toBe(request.habitId)
  })

	test('Deve retornar status 403 se CheckHabitById retornar false', async () => {
    const { sut, checkHabitByIdSpy } = makeSut()
		checkHabitByIdSpy.result = false

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
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
