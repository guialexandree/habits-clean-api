
import { DbToggleDayHabit } from './db-toggle-day-habit'
import { throwError } from '@/domain/test'
import {
	LoadDayHabitRepositorySpy,
	LoadDayRepositorySpy,
	RemoveDayHabitRepositorySpy
} from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
	sut: DbToggleDayHabit
	loadDayRepositorySpy: LoadDayRepositorySpy
	loadDayHabitRepositorySpy: LoadDayHabitRepositorySpy
	removeDayHabitRepositorySpy: RemoveDayHabitRepositorySpy
}

const makeSut = (): SutTypes => {
	const loadDayRepositorySpy = new LoadDayRepositorySpy()
	const loadDayHabitRepositorySpy = new LoadDayHabitRepositorySpy()
	const removeDayHabitRepositorySpy = new RemoveDayHabitRepositorySpy()

	const sut = new DbToggleDayHabit(
		loadDayRepositorySpy,
		loadDayHabitRepositorySpy,
		removeDayHabitRepositorySpy
	)

	return {
		sut,
		loadDayRepositorySpy,
		loadDayHabitRepositorySpy,
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

		test('Deve chamar loadCompletedHabit com os dados corretos', async () => {
			const { sut, loadDayRepositorySpy, loadDayHabitRepositorySpy } = makeSut()

			await sut.toggle('any_habit_id')

			expect(loadDayHabitRepositorySpy.dayId).toBe(loadDayRepositorySpy.result)
			expect(loadDayHabitRepositorySpy.habitId).toBe('any_habit_id')
		})

		test('Deve propagar o erro se loadCompletedHabit lançar exceção', async () => {
			const { sut, loadDayHabitRepositorySpy } = makeSut()
			jest.spyOn(loadDayHabitRepositorySpy, 'loadCompletedHabit').mockImplementationOnce(throwError)

			const promise = sut.toggle('any_habit_id')

			await expect(promise).rejects.toThrow()
		})

		test('Deve chamar removeDayHabit somente quando hábito ja tiver sido realizado', async () => {
			const { sut, removeDayHabitRepositorySpy, loadDayHabitRepositorySpy } = makeSut()
			loadDayHabitRepositorySpy.result = null

			await sut.toggle('any_habit_id')

			expect(removeDayHabitRepositorySpy.callsCount).toBe(0)
		})

		test('Deve chamar removeDayHabit com o dayId correto', async () => {
			const { sut, loadDayHabitRepositorySpy, removeDayHabitRepositorySpy } = makeSut()

			await sut.toggle('any_habit_id')

			expect(removeDayHabitRepositorySpy.dayHabitId).toEqual(loadDayHabitRepositorySpy.result)
			expect(removeDayHabitRepositorySpy.callsCount).toBe(1)
		})
	})
})
