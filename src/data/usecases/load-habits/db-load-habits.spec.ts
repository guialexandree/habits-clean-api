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

		const response = await sut.load(getPossibleHabitsParams.date, getPossibleHabitsParams.weekDay)

		expect(response).toEqual({
			possibleHabits: loadPossibleHabitsRepository.result
		})
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

	test('Deve chamar completedHabitsRepository com os valores corretos', async () => {
		const { sut, loadCompletedHabitsRepository } = makeSut()
		const getPossibleHabitsParams = {
			date: new Date(),
			weekDay: 1
		}

		await sut.load(getPossibleHabitsParams.date, getPossibleHabitsParams.weekDay)

		expect(loadCompletedHabitsRepository.date).toBe(getPossibleHabitsParams.date)
	})
})
