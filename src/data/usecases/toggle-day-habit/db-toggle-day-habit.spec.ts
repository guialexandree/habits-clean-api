
import MockDate from 'mockdate'
import { DbToggleDayHabit } from './db-toggle-day-habit'
import { LoadDayRepositorySpy } from '@/data/test'

type SutTypes = {
	sut: DbToggleDayHabit
	loadDayRepositorySpy: LoadDayRepositorySpy
}

const makeSut = (): SutTypes => {
	const loadDayRepositorySpy = new LoadDayRepositorySpy()
	const sut = new DbToggleDayHabit(loadDayRepositorySpy)

	return {
		sut,
		loadDayRepositorySpy
	}
}

describe('Caso de uso - Inverte status do hábito na data', () => {
	beforeAll(() => {
		MockDate.set(new Date())
	})

	afterAll(() => {
		MockDate.reset()
	})

	describe('loadPossibleHabitsRepository()', () => {
		test('Deve chamar loadDayRepository com a data correta', async () => {
			const { sut, loadDayRepositorySpy } = makeSut()
			const date = new Date()

			await sut.toggle('any_habit_id')

			expect(loadDayRepositorySpy.date).toEqual(date)
		})
	})
})
