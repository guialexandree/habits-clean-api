import faker from 'faker'
import { HabitModel, HabitResult } from '@/domain/model'

const mockHabitModel = (): HabitModel => ({
	id: faker.datatype.uuid(),
	title: faker.random.words(5),
	createdAt: faker.date.recent()
})

export const mockLoadPossibleHabits = (): HabitResult[] =>
	[...Array.from({ length: 5 })].map(_ => ({
		...mockHabitModel(),
		weekDays: [0, 2, 4]
	}))

export const mockLoadCompletedHabits = (): string[] =>
	[...Array.from({ length: 5 })].map(_ => faker.datatype.uuid())
