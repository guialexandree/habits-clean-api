import { prismaClient } from './prisma-client'
import { HabitSqliteRepository } from './habit-sqlite-repository'
import { AddHabit } from '@/domain/usecases'
import faker from 'faker'
import MockDate from 'mockdate'

const makeAddHabitParams = (): AddHabit.Params => ({
	title: faker.datatype.uuid(),
	weekDays: [0, 2, 5],
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
		await prismaClient.habitWeekDay.deleteMany({})
		await prismaClient.habit.deleteMany({})
		MockDate.set(new Date())
	})

	afterAll(async () => {
		MockDate.reset()
	})

	test('Deve adicionar o hábito com sucesso', async () => {
		const { sut } = makeSut()
		const addHabitParams = makeAddHabitParams()

		const { id } = await sut.add(addHabitParams)

		const count = await prismaClient.habit.count()
		expect(count).toBe(1)
		expect(id).toBeTruthy()
	})
})
