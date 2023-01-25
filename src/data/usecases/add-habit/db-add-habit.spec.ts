import { DbAddHabit } from './db-add-habit'
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
})
