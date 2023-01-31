
import { DbToggleDayHabit } from './db-toggle-day-habit'
import { throwError } from '@/domain/test'
import {
	AddDayHabitRepositorySpy,
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
	addDayHabitRepositorySpy: AddDayHabitRepositorySpy
}

const makeSut = (): SutTypes => {
	const loadDayRepositorySpy = new LoadDayRepositorySpy()
	const loadDayHabitRepositorySpy = new LoadDayHabitRepositorySpy()
	const removeDayHabitRepositorySpy = new RemoveDayHabitRepositorySpy()
	const addDayHabitRepositorySpy = new AddDayHabitRepositorySpy()

	const sut = new DbToggleDayHabit(
		loadDayRepositorySpy,
		loadDayHabitRepositorySpy,
		removeDayHabitRepositorySpy,
		addDayHabitRepositorySpy
	)

	return {
		sut,
		loadDayRepositorySpy,
		loadDayHabitRepositorySpy,
		removeDayHabitRepositorySpy,
		addDayHabitRepositorySpy
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
			const today = new Date()
			const parsedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

			await sut.toggle('any_habit_id')

			expect(loadDayRepositorySpy.date).toEqual(parsedDate)
		})

		test('Deve propagar o erro se loadDayRepository lançar exceção', async () => {
			const { sut, loadDayRepositorySpy } = makeSut()
			jest.spyOn(loadDayRepositorySpy, 'loadOrCreate').mockImplementationOnce(throwError)

			const promise = sut.toggle('any_habit_id')

			await expect(promise).rejects.toThrow()
		})

		test('Deve chamar loadCompletedHabitRepository com os dados corretos', async () => {
			const { sut, loadDayRepositorySpy, loadDayHabitRepositorySpy } = makeSut()

			await sut.toggle('any_habit_id')

			expect(loadDayHabitRepositorySpy.dayId).toBe(loadDayRepositorySpy.result)
			expect(loadDayHabitRepositorySpy.habitId).toBe('any_habit_id')
		})

		test('Deve propagar o erro se loadCompletedHabitRepository lançar exceção', async () => {
			const { sut, loadDayHabitRepositorySpy } = makeSut()
			jest.spyOn(loadDayHabitRepositorySpy, 'loadCompletedHabit').mockImplementationOnce(throwError)

			const promise = sut.toggle('any_habit_id')

			await expect(promise).rejects.toThrow()
		})

		test('Deve chamar removeDayHabitRepository somente quando hábito ja tiver sido realizado', async () => {
			const { sut, removeDayHabitRepositorySpy, loadDayHabitRepositorySpy } = makeSut()
			loadDayHabitRepositorySpy.result = null

			await sut.toggle('any_habit_id')

			expect(removeDayHabitRepositorySpy.callsCount).toBe(0)
		})

		test('Deve chamar removeDayHabitRepository com o dayId correto', async () => {
			const { sut, loadDayHabitRepositorySpy, removeDayHabitRepositorySpy } = makeSut()

			await sut.toggle('any_habit_id')

			expect(removeDayHabitRepositorySpy.dayHabitId).toEqual(loadDayHabitRepositorySpy.result)
			expect(removeDayHabitRepositorySpy.callsCount).toBe(1)
		})

		test('Deve propagar o erro se removeDayHabitRepository lançar exceção', async () => {
			const { sut, removeDayHabitRepositorySpy } = makeSut()
			jest.spyOn(removeDayHabitRepositorySpy, 'removeById').mockImplementationOnce(throwError)

			const promise = sut.toggle('any_habit_id')

			await expect(promise).rejects.toThrow()
		})

		test('Deve chamar addDayHabitRepositorySpy com os dados corretos', async () => {
			const { sut, loadDayRepositorySpy, loadDayHabitRepositorySpy, addDayHabitRepositorySpy } = makeSut()
			loadDayHabitRepositorySpy.result = null

			await sut.toggle('any_habit_id')

			expect(addDayHabitRepositorySpy.dayId).toBe(loadDayRepositorySpy.result)
			expect(addDayHabitRepositorySpy.habitId).toBe('any_habit_id')
		})

		test('Deve propagar o erro se addDayHabit lançar exceção', async () => {
			const { sut, loadDayHabitRepositorySpy, addDayHabitRepositorySpy } = makeSut()
			loadDayHabitRepositorySpy.result = null
			jest.spyOn(addDayHabitRepositorySpy, 'addDayHabit').mockImplementationOnce(throwError)

			const promise = sut.toggle('any_habit_id')

			await expect(promise).rejects.toThrow()
		})

		test('Deve chamar addDayHabit somente quando hábito ainda não foi realizado', async () => {
			const { sut, addDayHabitRepositorySpy } = makeSut()

			await sut.toggle('any_habit_id')

			expect(addDayHabitRepositorySpy.callsCount).toBe(0)
		})
	})
})
