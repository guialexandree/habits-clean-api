import { DbLoadHabits } from './db-load-habits'
import { throwError } from '@/domain/test'
import { LoadCompletedHabitsRepositorySpy, LoadPossibleHabitsRepositorySpy } from '@/data/test'

type SutTypes = {
	sut: DbLoadHabits
	loadPossibleHabitsRepository: LoadPossibleHabitsRepositorySpy
	loadCompletedHabitsRepository: LoadCompletedHabitsRepositorySpy
}

const makeSut = (): SutTypes => {
	const loadPossibleHabitsRepository = new LoadPossibleHabitsRepositorySpy()
	const loadCompletedHabitsRepository = new LoadCompletedHabitsRepositorySpy()
	const sut = new DbLoadHabits(loadPossibleHabitsRepository, loadCompletedHabitsRepository)

	return {
		sut,
		loadPossibleHabitsRepository,
		loadCompletedHabitsRepository
	}
}

describe('Caso de uso - Adicionar Hábito', () => {
	describe('loadPossibleHabitsRepository()', () => {
		test('Deve chamar loadPossibleHabitsRepository com os valores corretos', async () => {
			const { sut, loadPossibleHabitsRepository } = makeSut()
			const getPossibleHabitsParams = {
				date: new Date(),
				weekDay: 1
			}

			await sut.load(getPossibleHabitsParams.date, getPossibleHabitsParams.weekDay)

			expect(loadPossibleHabitsRepository.date).toBe(getPossibleHabitsParams.date)
			expect(loadPossibleHabitsRepository.weekDay).toBe(getPossibleHabitsParams.weekDay)
		})

		test('LoadPossibleHabitsRepository deve retornar uma lista de hábitos possíveis', async () => {
			const { sut, loadPossibleHabitsRepository } = makeSut()
			const getPossibleHabitsParams = {
				date: new Date(),
				weekDay: 1
			}

			const { possibleHabits } = await sut.load(getPossibleHabitsParams.date, getPossibleHabitsParams.weekDay)

			expect(possibleHabits).toEqual(loadPossibleHabitsRepository.result)
		})

		test('Deve propagar o erro se dbAddHabitRepository lançar exceção', async () => {
			const { sut, loadPossibleHabitsRepository } = makeSut()
			jest.spyOn(loadPossibleHabitsRepository, 'loadByDateAndWeekDay').mockImplementationOnce(throwError)
			const getPossibleHabitsParams = {
				date: new Date(),
				weekDay: 1
			}

			const promise = sut.load(getPossibleHabitsParams.date, getPossibleHabitsParams.weekDay)

			await expect(promise).rejects.toThrow()
		})
	})

	describe('loadCompletedHabitsRepository()', () => {
		test('Deve chamar loadCompletedHabitsRepository com os valores corretos', async () => {
			const { sut, loadCompletedHabitsRepository } = makeSut()
			const getCompletedHabitsParams = {
				date: new Date(),
				weekDay: 1
			}

			await sut.load(getCompletedHabitsParams.date, getCompletedHabitsParams.weekDay)

			expect(loadCompletedHabitsRepository.date).toBe(getCompletedHabitsParams.date)
		})

		test('LoadCompletedHabitsRepository deve retornar uma lista de ids realizados', async () => {
			const { sut, loadCompletedHabitsRepository } = makeSut()
			const getCompletedHabitsParams = {
				date: new Date(),
				weekDay: 1
			}

			const { completedHabits } = await sut.load(getCompletedHabitsParams.date, getCompletedHabitsParams.weekDay)

			expect(completedHabits).toEqual(loadCompletedHabitsRepository.result)
		})

		test('Deve propagar o erro se loadCompletedHabitsRepository lançar exceção', async () => {
			const { sut, loadCompletedHabitsRepository } = makeSut()
			jest.spyOn(loadCompletedHabitsRepository, 'loadByDate').mockImplementationOnce(throwError)
			const getPossibleHabitsParams = {
				date: new Date(),
				weekDay: 1
			}

			const promise = sut.load(getPossibleHabitsParams.date, getPossibleHabitsParams.weekDay)

			await expect(promise).rejects.toThrow()
		})
	})
})
