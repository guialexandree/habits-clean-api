import { DbAddHabit } from './db-add-habit'
import { throwError } from '@/domain/test'
import { AddHabitReposistorySpy } from '@/data/test'

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
	test('Deve chamar dbAddHabitRepository com os valores corretos', async () => {
		const { sut, dbAddReposistorySpy } = makeSut()

		const addHabitParams = {
			title: 'txt01',
			createdAt: new Date().toISOString()
		}

		await sut.add(addHabitParams)
		expect(dbAddReposistorySpy.addHabitParams).toEqual(addHabitParams)
	})

	test('Deve propagar o erro se dbAddHabitRepository lançar exceção', async () => {
		const { sut, dbAddReposistorySpy } = makeSut()

		jest
			.spyOn(dbAddReposistorySpy, 'add')
			.mockImplementationOnce(throwError)

		const addHabitParams = {
			title: 'txt01',
			createdAt: new Date().toISOString()
		}

		const promise = sut.add(addHabitParams)

		await expect(promise).rejects.toThrow()
	})
})
