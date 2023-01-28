import { DbLoadHabits } from './db-load-habits'
import { throwError } from '@/domain/test'
import { LoadCompletedHabitsRepositorySpy, LoadPossibleHabitsRepositorySpy } from '@/data/test'

type SutTypes = {
	sut: DbLoadHabits
	loadPossibleHabitsRepositorySpy: LoadPossibleHabitsRepositorySpy
	loadCompletedHabitsRepositorySpy: LoadCompletedHabitsRepositorySpy
}

const makeSut = (): SutTypes => {
	const loadPossibleHabitsRepositorySpy = new LoadPossibleHabitsRepositorySpy()
	const loadCompletedHabitsRepositorySpy = new LoadCompletedHabitsRepositorySpy()
	const sut = new DbLoadHabits(loadPossibleHabitsRepositorySpy, loadCompletedHabitsRepositorySpy)

	return {
		sut,
		loadPossibleHabitsRepositorySpy,
		loadCompletedHabitsRepositorySpy
	}
}

describe('Caso de uso - Adicionar Hábito', () => {
	describe('loadPossibleHabitsRepository()', () => {
		test('Deve chamar loadPossibleHabitsRepository com os valores corretos', async () => {
			const { sut, loadPossibleHabitsRepositorySpy } = makeSut()
			const date = new Date()

			await sut.load(date)

			expect(loadPossibleHabitsRepositorySpy.date).toBe(date)
		})

		test('LoadPossibleHabitsRepository deve retornar uma lista de hábitos possíveis', async () => {
			const { sut, loadPossibleHabitsRepositorySpy } = makeSut()
			const date = new Date()

			const { possibleHabits } = await sut.load(date)

			expect(possibleHabits).toEqual(loadPossibleHabitsRepositorySpy.result)
		})

		test('Deve propagar o erro se dbAddHabitRepository lançar exceção', async () => {
			const { sut, loadPossibleHabitsRepositorySpy } = makeSut()
			jest.spyOn(loadPossibleHabitsRepositorySpy, 'loadByDateAndWeekDay').mockImplementationOnce(throwError)
			const date = new Date()

			const promise = sut.load(date)

			await expect(promise).rejects.toThrow()
		})
	})

	describe('loadCompletedHabitsRepository()', () => {
		test('Deve chamar loadCompletedHabitsRepositorySpy com os valores corretos', async () => {
			const { sut, loadCompletedHabitsRepositorySpy } = makeSut()
			const date = new Date()

			await sut.load(date)

			expect(loadCompletedHabitsRepositorySpy.date).toBe(date)
		})

		test('LoadCompletedHabitsRepository deve retornar uma lista de ids realizados', async () => {
			const { sut, loadCompletedHabitsRepositorySpy } = makeSut()

			const { completedHabits } = await sut.load(new Date())

			expect(completedHabits).toEqual(loadCompletedHabitsRepositorySpy.result)
		})

		test('Deve propagar o erro se loadCompletedHabitsRepositorySpy lançar exceção', async () => {
			const { sut, loadCompletedHabitsRepositorySpy } = makeSut()
			jest.spyOn(loadCompletedHabitsRepositorySpy, 'loadByDate').mockImplementationOnce(throwError)

			const promise = sut.load(new Date())

			await expect(promise).rejects.toThrow()
		})
	})

	test('Deve retornar objetos com array vazio se repos retornar null', async () => {
		const { sut, loadCompletedHabitsRepositorySpy, loadPossibleHabitsRepositorySpy } = makeSut()
			loadCompletedHabitsRepositorySpy.result = null
			loadPossibleHabitsRepositorySpy.result = null

			const result = await sut.load(new Date())

			expect(result).toEqual({
				possibleHabits: [],
				completedHabits: []
			})
	})
})
