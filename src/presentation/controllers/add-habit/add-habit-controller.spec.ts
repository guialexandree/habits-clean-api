import { AddHabitController } from './add-habit-controller'
import { throwError } from '@/domain/test'
import { DbAddHabitSpy, ValidationSpy } from '@/presentation/test'
import { badRequest, created, serverError } from '@/presentation/helpers'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): AddHabitController.Request => {
  return {
    title: faker.random.words(3),
		weekDays: [2, 4, 0]
  }
}

type SutTypes = {
	sut: AddHabitController
	validationSpy: ValidationSpy
	dbAddHabitSpy: DbAddHabitSpy
}

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy()
	const dbAddHabitSpy = new DbAddHabitSpy()
	const sut = new AddHabitController(validationSpy, dbAddHabitSpy)

	return {
		sut,
		validationSpy,
		dbAddHabitSpy
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

	test('Deve chamar AddHabit com os valores corretos', async () => {
    const { sut, dbAddHabitSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(dbAddHabitSpy.addHabitParams).toEqual({
			...request,
			createdAt: new Date()
		})
  })

	test('Deve retornar status 400 se Validation falhar', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

	test('Deve retornar status 500 se AddHabit lançar exceção', async () => {
    const { sut, dbAddHabitSpy } = makeSut()
    jest
      .spyOn(dbAddHabitSpy, 'add')
      .mockImplementationOnce(throwError)

    const response = await sut.handle(mockRequest())

    expect(response).toEqual(serverError(new Error()))
  })

	test('Deve retornar status 500 se Validation lançar exceção', async () => {
    const { sut, validationSpy } = makeSut()
    jest
      .spyOn(validationSpy, 'validate')
      .mockImplementationOnce(throwError)

    const response = await sut.handle(mockRequest())

    expect(response).toEqual(serverError(new Error()))
  })

	test('Deve retornar status 201 quando criado com sucesso', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(mockRequest())

    expect(response).toEqual(created())
  })
})
