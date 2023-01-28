import { LoadHabitsController } from './load-habits-controller'
import { ValidationSpy } from '@/presentation/test'
import MockDate from 'mockdate'
import faker from 'faker'

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
    const request = {
			date: faker.date.recent().toISOString()
		}

    await sut.handle(request)

    expect(validationSpy.input).toEqual(request)
  })
})
