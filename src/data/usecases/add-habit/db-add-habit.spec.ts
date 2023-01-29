import { DbAddHabit } from './db-add-habit'
import { throwError } from '@/domain/test'
import { AddHabitReposistorySpy } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
	sut: DbAddHabit
	dbAddReposistorySpy: AddHabitReposistorySpy
}

const makeSut = (): SutTypes => {
	const dbAddReposistorySpy = new AddHabitReposistorySpy()
	const sut = new DbAddHabit(dbAddReposistorySpy)

	return {
		sut,
		dbAddReposistorySpy
	}
}

describe('Caso de uso - Adicionar Hábito', () => {
	beforeAll(() => {
		MockDate.set(new Date())
	})

	afterAll(() => {
		MockDate.reset()
	})

	test('Deve chamar dbAddHabitRepository com os valores corretos', async () => {
		const { sut, dbAddReposistorySpy } = makeSut()
		const addHabitParams = {
			title: 'txt01',
			createdAt: new Date(),
			weekDays: [0, 2]
		}

		await sut.add(addHabitParams)

		expect(dbAddReposistorySpy.addHabitParams).toEqual(addHabitParams)
	})

	test('Deve propagar o erro se dbAddHabitRepository lançar exceção', async () => {
		const { sut, dbAddReposistorySpy } = makeSut()
		jest.spyOn(dbAddReposistorySpy, 'addHabit').mockImplementationOnce(throwError)
		const addHabitParams = {
			title: 'txt01',
			createdAt: new Date(),
			weekDays: [0, 2]
		}

		const promise = sut.add(addHabitParams)

		await expect(promise).rejects.toThrow()
	})
})
