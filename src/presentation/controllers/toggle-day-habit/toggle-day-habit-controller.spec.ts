import { ToggleDayHabitController } from './toggle-day-habit-controller'
import { DbToggleDayHabitSpy, ValidationSpy } from '@/presentation/test'
import { badRequest } from '@/presentation/helpers'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): ToggleDayHabitController.Request => ({
	habitId: faker.datatype.uuid()
})

type SutTypes = {
	sut: ToggleDayHabitController
	validationSpy: ValidationSpy
	dbToggleDayHabitSpy: DbToggleDayHabitSpy
}

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy()
	const dbToggleDayHabitSpy = new DbToggleDayHabitSpy()
	const sut = new ToggleDayHabitController(validationSpy, dbToggleDayHabitSpy)

	return {
		sut,
		validationSpy,
		dbToggleDayHabitSpy
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

	test('Deve retornar status 400 se Validation falhar', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
