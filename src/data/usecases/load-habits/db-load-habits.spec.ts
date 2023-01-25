import { DbLoadHabits } from './db-load-habits'
import { LoadPossibleHabitsRepositorySpy } from '@/data/test'

type SutTypes = {
	sut: DbLoadHabits
	loadPossibleHabitsRepository: LoadPossibleHabitsRepositorySpy
}

const makeSut = (): SutTypes => {
	const loadPossibleHabitsRepository = new LoadPossibleHabitsRepositorySpy()
	const sut = new DbLoadHabits(loadPossibleHabitsRepository)

	return {
		sut,
		loadPossibleHabitsRepository
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
})
