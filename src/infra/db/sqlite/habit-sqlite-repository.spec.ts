import { prismaClient } from './prisma-client'
import { HabitSqliteRepository } from './habit-sqlite-repository'
import { AddHabit } from '@/domain/usecases'
import { WeekDay } from '@/main/types'
import faker from 'faker'
import MockDate from 'mockdate'

const createDay = async (createdAt: Date): Promise<string> => {
	const { id } = await prismaClient.day.create({
		data: {
			date: createdAt
		}
	})

	return id
}

const createNewHabit = async (createdAt = faker.date.recent(), weekDay: number, dayId?: string): Promise<string> => {
	const { id } = await prismaClient.habit.create({
		data: {
			title: faker.random.words(4),
			created_at: createdAt,
			weekDays: {
				create: {
					week_day: weekDay
				}
			},
			...(dayId && {
				dayHabits: {
					create: {
						day_id: dayId
					}
				}
			})
		}
	})

	return id
}

const makeAddHabitParams = (): AddHabit.Params => ({
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
			await createNewHabit(new Date('2023-01-21'), weekDay === 6 ? (weekDay - 1) : (weekDay + 1))
			await createNewHabit(new Date('2023-01-21'), weekDay)
			await createNewHabit(new Date('2023-01-22'), weekDay)
			await createNewHabit(new Date('2023-01-23'), weekDay)

			const list = await sut.loadByDateAndWeekDay(searchDate, weekDay)

			expect(list.length).toBe(2)
		})
	})

	describe('loadByDate()', () => {
		test('Deve retornar lista de string com id dos hábitos completados na data', async () => {
			const { sut } = makeSut()
			const searchDate = new Date('2023-01-23')
			const dayId = await createDay(searchDate)
			const habitId = await createNewHabit(searchDate, 0, dayId)

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

		test('Deve retornar identificador do dia fornecido', async () => {
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
			const habitId = await createNewHabit(date, 0, dayId)
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
			const habitId = await createNewHabit(date, 0, dayId)
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
			const habitId = await createNewHabit(date, 0, dayId)
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
			const habitId = await createNewHabit(date, 0, dayId)

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
})
