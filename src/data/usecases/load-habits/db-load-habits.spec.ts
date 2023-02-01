import { DbLoadHabits } from './db-load-habits'
import { throwError } from '@/domain/test'
import { DateStartOfAdapterSpy, DateWeekDayAdapterSpy, LoadCompletedHabitsRepositorySpy, LoadPossibleHabitsRepositorySpy } from '@/data/test'

type SutTypes = {
	sut: DbLoadHabits
	loadPossibleHabitsRepositorySpy: LoadPossibleHabitsRepositorySpy
	loadCompletedHabitsRepositorySpy: LoadCompletedHabitsRepositorySpy
	dateStartOfAdapterSpy: DateStartOfAdapterSpy
	dateWeekDayAdapterSpy: DateWeekDayAdapterSpy
}

const makeSut = (): SutTypes => {
	const loadPossibleHabitsRepositorySpy = new LoadPossibleHabitsRepositorySpy()
	const loadCompletedHabitsRepositorySpy = new LoadCompletedHabitsRepositorySpy()
	const dateStartOfAdapterSpy = new DateStartOfAdapterSpy()
	const dateWeekDayAdapterSpy = new DateWeekDayAdapterSpy()

	const sut = new DbLoadHabits(
		loadPossibleHabitsRepositorySpy,
		loadCompletedHabitsRepositorySpy,
		dateStartOfAdapterSpy,
		dateWeekDayAdapterSpy
		)

	return {
		sut,
		loadPossibleHabitsRepositorySpy,
		loadCompletedHabitsRepositorySpy,
		dateStartOfAdapterSpy,
		dateWeekDayAdapterSpy
	}
}

const date = new Date().toISOString()

describe('Caso de uso - Adicionar Hábito', () => {
	describe('loadPossibleHabitsRepository()', () => {
		test('Deve chamar loadPossibleHabitsRepository com os valores corretos', async () => {
			const { sut, loadPossibleHabitsRepositorySpy, dateStartOfAdapterSpy } = makeSut()

			await sut.load(date)

			expect(loadPossibleHabitsRepositorySpy.date).toBe(dateStartOfAdapterSpy.result)
		})

		test('LoadPossibleHabitsRepository deve retornar uma lista de hábitos possíveis', async () => {
			const { sut, loadPossibleHabitsRepositorySpy } = makeSut()

			const { possibleHabits } = await sut.load(date)

			expect(possibleHabits).toEqual(loadPossibleHabitsRepositorySpy.result)
		})

		test('Deve propagar o erro se dbAddHabitRepository lançar exceção', async () => {
			const { sut, loadPossibleHabitsRepositorySpy } = makeSut()
			jest.spyOn(loadPossibleHabitsRepositorySpy, 'loadByDateAndWeekDay').mockImplementationOnce(throwError)

			const promise = sut.load(date)

			await expect(promise).rejects.toThrow()
		})
	})

	describe('loadCompletedHabitsRepository()', () => {
		test('Deve chamar loadCompletedHabitsRepositorySpy com os valores corretos', async () => {
			const { sut, loadCompletedHabitsRepositorySpy, dateStartOfAdapterSpy } = makeSut()

			await sut.load(date)

			expect(loadCompletedHabitsRepositorySpy.date).toBe(dateStartOfAdapterSpy.result)
		})

		test('LoadCompletedHabitRepository deve retornar uma lista de ids realizados', async () => {
			const { sut, loadCompletedHabitsRepositorySpy } = makeSut()

			const { completedHabits } = await sut.load(date)

			expect(completedHabits).toEqual(loadCompletedHabitsRepositorySpy.result)
		})

		test('Deve propagar o erro se loadCompletedHabitsRepositorySpy lançar exceção', async () => {
			const { sut, loadCompletedHabitsRepositorySpy } = makeSut()
			jest.spyOn(loadCompletedHabitsRepositorySpy, 'loadByDate').mockImplementationOnce(throwError)

			const promise = sut.load(date)

			await expect(promise).rejects.toThrow()
		})
	})

	test('Deve retornar objetos com array vazio se repos retornar undefined', async () => {
		const { sut, loadCompletedHabitsRepositorySpy, loadPossibleHabitsRepositorySpy } = makeSut()
			loadCompletedHabitsRepositorySpy.result = undefined
			loadPossibleHabitsRepositorySpy.result = undefined

			const result = await sut.load(date)

			expect(result).toEqual({
				possibleHabits: [],
				completedHabits: []
			})
	})

	test('Deve retornar objetos com array vazio se repos retornar null', async () => {
		const { sut, loadCompletedHabitsRepositorySpy, loadPossibleHabitsRepositorySpy } = makeSut()
			loadCompletedHabitsRepositorySpy.result = null
			loadPossibleHabitsRepositorySpy.result = null

			const result = await sut.load(date)

			expect(result).toEqual({
				possibleHabits: [],
				completedHabits: []
			})
	})

	test('Deve chamar dataAdapter com o valor correto', async () => {
		const { sut, dateStartOfAdapterSpy } = makeSut()

		await sut.load(date)

		expect(dateStartOfAdapterSpy.date).toEqual(date)
	})
})
