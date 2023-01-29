
import { DbToggleDayHabit } from './db-toggle-day-habit'
import { throwError } from '@/domain/test'
import { LoadCompletedHabitsRepositorySpy, LoadDayRepositorySpy } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
	sut: DbToggleDayHabit
	loadDayRepositorySpy: LoadDayRepositorySpy
	loadCompletedHabitsRepositorySpy: LoadCompletedHabitsRepositorySpy
}

const makeSut = (): SutTypes => {
	const loadDayRepositorySpy = new LoadDayRepositorySpy()
	const loadCompletedHabitsRepositorySpy = new LoadCompletedHabitsRepositorySpy()
	const sut = new DbToggleDayHabit(loadDayRepositorySpy, loadCompletedHabitsRepositorySpy)

	return {
		sut,
		loadDayRepositorySpy,
		loadCompletedHabitsRepositorySpy
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

		test('Deve propagar o erro se loadDayRepository lançar exceção', async () => {
			const { sut, loadDayRepositorySpy } = makeSut()
			jest.spyOn(loadDayRepositorySpy, 'loadOrCreate').mockImplementationOnce(throwError)

			const promise = sut.toggle('any_habit_id')

			await expect(promise).rejects.toThrow()
		})

		test('Deve chamar loadCompletedHabits com a data correta', async () => {
			const { sut, loadCompletedHabitsRepositorySpy } = makeSut()
			const date = new Date()

			await sut.toggle('any_habit_id')

			expect(loadCompletedHabitsRepositorySpy.date).toEqual(date)
		})
	})
})
