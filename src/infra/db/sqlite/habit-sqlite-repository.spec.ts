import { prismaClient } from './prisma-client'
import { HabitSqliteRepository } from './habit-sqlite-repository'
import { AddHabit } from '@/domain/usecases'
import faker from 'faker'
import MockDate from 'mockdate'
import { WeekDay } from '@/main/types'

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

	describe('add()', () => {
		test('Deve adicionar o hábito com sucesso', async () => {
			const { sut } = makeSut()
			const addHabitParams = makeAddHabitParams()

			const { id } = await sut.add(addHabitParams)

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
})
