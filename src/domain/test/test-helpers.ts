import { prismaClient } from '@/infra/db/sqlite'
import faker from 'faker'

export const throwError = (): never => {
	throw new Error()
}

export const createDay = async (createdAt: Date): Promise<string> => {
	const { id } = await prismaClient.day.create({
		data: {
			date: createdAt
		}
	})

	return id
}

export const createHabit = async (createdAt = faker.date.recent(), weekDay: number, dayId?: string): Promise<string> => {
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
