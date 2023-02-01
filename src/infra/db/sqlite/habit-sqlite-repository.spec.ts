import { prismaClient } from './prisma-client'
import { HabitSqliteRepository } from './habit-sqlite-repository'
import { WeekDay } from '@/main/types'
import { AddHabitRepository } from '@/data/protocols'
import { createDay, createHabit } from '@/domain/test'
import faker from 'faker'
import MockDate from 'mockdate'

const makeAddHabitParams = (): AddHabitRepository.Params => ({
	title: faker.datatype.uuid(),
	weekDays: [
		WeekDay.SATURDAY,
		WeekDay.MONDAY,
		WeekDay.THURSDAY
	],
	createdAt: new Date()
})

type SutTypes = {
	sut: HabitSqliteRepository
}

const makeSut = (): SutTypes => {
	const sut = new HabitSqliteRepository()

	return {
		sut
	}
}

describe('Habit Sqlite Repository', () => {
	beforeAll(async () => {
		await prismaClient.dayHabit.deleteMany({})
		await prismaClient.day.deleteMany({})
		await prismaClient.habitWeekDay.deleteMany({})
		await prismaClient.habit.deleteMany({})
		MockDate.set(new Date())
	})

	afterAll(async () => {
		MockDate.reset()
	})

	describe('addHabit()', () => {
		test('Deve adicionar o hábito com sucesso', async () => {
			const { sut } = makeSut()
			const addHabitParams = makeAddHabitParams()

			const { id } = await sut.addHabit(addHabitParams)

			const count = await prismaClient.habit.count()
			expect(count).toBe(1)
			expect(id).toBeTruthy()
		})
	})

	describe('loadByDateAndWeekDay', () => {
		test('Deve retornar lista com habítos possíveis na data', async () => {
			const { sut } = makeSut()
			const searchDate = new Date('2023-01-22')
			const weekDay = searchDate.getDay()
			await createHabit(new Date('2023-01-21'), weekDay === 6 ? (weekDay - 1) : (weekDay + 1))
			await createHabit(new Date('2023-01-21'), weekDay)
			await createHabit(new Date('2023-01-22'), weekDay)
			await createHabit(new Date('2023-01-23'), weekDay)

			const list = await sut.loadByDateAndWeekDay(searchDate, weekDay)

			expect(list.length).toBe(2)
		})
	})

	describe('loadByDate()', () => {
		test('Deve retornar lista de string com id dos hábitos completados na data', async () => {
			const { sut } = makeSut()
			const searchDate = new Date('2023-01-23')
			const dayId = await createDay(searchDate)
			const habitId = await createHabit(searchDate, 0, dayId)

			const list = await sut.loadByDate(searchDate)

			expect(list[0]).toBe(habitId)
		})
	})

	describe('loadOrCreate()', () => {
		test('Deve retornar identificador do dia fornecido', async () => {
			const { sut } = makeSut()
			const searchDate = new Date('2023-01-23')
			await prismaClient.dayHabit.deleteMany({})
			await prismaClient.day.deleteMany({})
			const mockDayId = await createDay(searchDate)

			const dayId = await sut.loadOrCreate(searchDate)

			expect(dayId).toBe(mockDayId)
		})

		test('Deve retornar identificador do dia fornecido e criar data', async () => {
			const { sut } = makeSut()
			const searchDate = new Date('2023-01-23')
			await prismaClient.dayHabit.deleteMany({})
			await prismaClient.day.deleteMany({})

			const dayId = await sut.loadOrCreate(searchDate)

			expect(dayId).toBeTruthy()
		})
	})

	describe('loadCompletedHabit()', () => {
		test('Deve retornar identificador dayHabitId correto', async () => {
			const { sut } = makeSut()
			const date = new Date('2023-02-01')
			const dayId = await createDay(date)
			const habitId = await createHabit(date, 0, dayId)
			await prismaClient.dayHabit.deleteMany({})
			const { id: mockDayHabitId } = await prismaClient.dayHabit.create({
				data: {
					day_id: dayId,
					habit_id: habitId
				}
			})

			const dayHabitId = await sut.loadCompletedHabit(habitId, dayId)

			expect(dayHabitId).toBe(mockDayHabitId)
		})

		test('Deve retornar null caso hábito ainda não foi realizado na data', async () => {
			const { sut } = makeSut()
			const date = new Date('2023-02-01')
			await prismaClient.dayHabit.deleteMany({})
			await prismaClient.day.deleteMany({})
			const dayId = await createDay(date)
			const habitId = await createHabit(date, 0, dayId)
			await prismaClient.dayHabit.deleteMany({})

			const dayHabitId = await sut.loadCompletedHabit(habitId, dayId)

			expect(dayHabitId).toBeFalsy()
		})
	})

	describe('removeById()', () => {
		test('Deve remover dayHabit', async () => {
			const { sut } = makeSut()
			const date = new Date('2023-02-01')
			await prismaClient.dayHabit.deleteMany({})
			await prismaClient.day.deleteMany({})
			const dayId = await createDay(date)
			const habitId = await createHabit(date, 0, dayId)
			await prismaClient.dayHabit.deleteMany({})
			const { id: mockDayHabitId } = await prismaClient.dayHabit.create({
				data: {
					day_id: dayId,
					habit_id: habitId
				}
			})

			await sut.removeById(mockDayHabitId)

			const dayHabit = await prismaClient.dayHabit.findUnique({
				where: {
					day_id_habit_id: {
						day_id: dayId,
						habit_id: habitId
					}
				}
			})

			expect(dayHabit).toBeFalsy()
		})
	})

	describe('addDayHabit()', () => {
		test('Deve marcar o hábito como realizado criando o registro em dayHabits', async () => {
			const { sut } = makeSut()
			const date = new Date('2023-02-01')
			await prismaClient.dayHabit.deleteMany({})
			await prismaClient.day.deleteMany({})
			const dayId = await createDay(date)
			const habitId = await createHabit(date, 0, dayId)

			await prismaClient.dayHabit.delete({
				where: {
					day_id_habit_id: {
						day_id: dayId,
						habit_id: habitId
					}
				}
			})

			await sut.addDayHabit(habitId, dayId)

			const dayHabit = await prismaClient.dayHabit.findUnique({
				where: {
					day_id_habit_id: {
						day_id: dayId,
						habit_id: habitId
					}
				},
				include: {
					day: true,
					habit: true
				}
			})

			expect(dayHabit).toBeTruthy()
			expect(dayHabit.day.date).toEqual(date)
		})
	})

	describe('loadYear()', () => {
		test('Deve retornar resumo geral do ano atual ', async () => {
			const { sut } = makeSut()
			await prismaClient.dayHabit.deleteMany({})
			await prismaClient.day.deleteMany({})
			const date = new Date('2023-02-01')
			const dayId = await createDay(date)
			await createHabit(date, 0, dayId)

			const summary = await sut.loadYear()

			expect(summary[0].id).toBe(dayId)
			expect(summary[0].completed).toBe(1)
			expect(summary[0].amount).toBe(0)
		})
	})
})
