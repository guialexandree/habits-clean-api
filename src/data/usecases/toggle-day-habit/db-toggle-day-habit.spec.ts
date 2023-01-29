
import { DbToggleDayHabit } from './db-toggle-day-habit'
import { throwError } from '@/domain/test'
import {
	LoadCompletedHabitRepositorySpy,
	LoadDayRepositorySpy,
	RemoveDayHabitRepositorySpy
} from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
	sut: DbToggleDayHabit
	loadDayRepositorySpy: LoadDayRepositorySpy
	loadCompletedHabitsRepositorySpy: LoadCompletedHabitRepositorySpy
	removeDayHabitRepositorySpy: RemoveDayHabitRepositorySpy
}

const makeSut = (): SutTypes => {
	const loadDayRepositorySpy = new LoadDayRepositorySpy()
	const loadCompletedHabitsRepositorySpy = new LoadCompletedHabitRepositorySpy()
	const removeDayHabitRepositorySpy = new RemoveDayHabitRepositorySpy()

	const sut = new DbToggleDayHabit(
		loadDayRepositorySpy,
		loadCompletedHabitsRepositorySpy,
		removeDayHabitRepositorySpy
	)

	return {
		sut,
		loadDayRepositorySpy,
		loadCompletedHabitsRepositorySpy,
		removeDayHabitRepositorySpy
	}
}

describe('Caso de uso - Inverte status do hábito na data', () => {
	beforeAll(() => {
		MockDate.set(new Date())
	})

	afterAll(() => {
		MockDate.reset()
	})

	describe('toggle()', () => {
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

		test('Deve propagar o erro se loadCompletedHabits lançar exceção', async () => {
			const { sut, loadCompletedHabitsRepositorySpy } = makeSut()
			jest.spyOn(loadCompletedHabitsRepositorySpy, 'loadByDate').mockImplementationOnce(throwError)

			const promise = sut.toggle('any_habit_id')

			await expect(promise).rejects.toThrow()
		})

		test('Deve chamar removeDayHabit com o dayId correto', async () => {
			const { sut, loadDayRepositorySpy, removeDayHabitRepositorySpy } = makeSut()

			await sut.toggle('any_habit_id')

			expect(removeDayHabitRepositorySpy.dayHabitId).toEqual(loadDayRepositorySpy.result)
		})
	})
})
