import { ValidationSpy } from '@/presentation/test'
import { AddHabitController } from './add-habit-controller'
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
})
