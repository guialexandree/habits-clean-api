import { DbAddHabit } from './db-add-habit'
import { throwError } from '@/domain/test'
import { AddHabitReposistorySpy, DateStartTodayAdapterSpy } from '@/data/test'

type SutTypes = {
	sut: DbAddHabit
	dbAddReposistorySpy: AddHabitReposistorySpy
	dateAdapterSpy: DateStartTodayAdapterSpy
}

const makeSut = (): SutTypes => {
	const dbAddReposistorySpy = new AddHabitReposistorySpy()
	const dateAdapterSpy = new DateStartTodayAdapterSpy()
	const sut = new DbAddHabit(dbAddReposistorySpy, dateAdapterSpy)

	return {
		sut,
		dbAddReposistorySpy,
		dateAdapterSpy
	}
}

describe('Caso de uso - Adicionar Hábito', () => {
	test('Deve chamar dbAddHabitRepository com os valores corretos', async () => {
		const { sut, dbAddReposistorySpy, dateAdapterSpy } = makeSut()
		const addHabitParams = {
			title: 'txt01',
			weekDays: [0, 2]
		}

		await sut.add(addHabitParams)

		expect(dbAddReposistorySpy.addHabitParams).toEqual({
			...addHabitParams,
			createdAt: dateAdapterSpy.result
		})
	})

	test('Deve propagar o erro se dbAddHabitRepository lançar exceção', async () => {
		const { sut, dbAddReposistorySpy } = makeSut()
		jest.spyOn(dbAddReposistorySpy, 'addHabit').mockImplementationOnce(throwError)
		const addHabitParams = {
			title: 'txt01',
			weekDays: [0, 2]
		}

		const promise = sut.add(addHabitParams)

		await expect(promise).rejects.toThrow()
	})

	test('Deve chamar dateAdapter para obter data de criação', async () => {
		const { sut, dateAdapterSpy } = makeSut()
		const startOfTodaySpy = jest.spyOn(dateAdapterSpy, 'startOfToday')

		const addHabitParams = {
			title: 'txt01',
			weekDays: [0, 2]
		}
		await sut.add(addHabitParams)

		expect(startOfTodaySpy).toHaveBeenCalled()
	})

	test('Deve chamar dbAddHabitRepository com a data do dateAdapter', async () => {
		const { sut, dbAddReposistorySpy, dateAdapterSpy } = makeSut()

		const addHabitParams = {
			title: 'txt01',
			weekDays: [0, 2]
		}
		await sut.add(addHabitParams)

		expect(dbAddReposistorySpy.addHabitParams.createdAt).toEqual(dateAdapterSpy.result)
	})
})
