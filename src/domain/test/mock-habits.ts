import faker from 'faker'
import { HabitModel, HabitResult } from '@/domain/model'

export const mockHabitModel = (): HabitModel => ({
	id: faker.datatype.uuid(),
	title: faker.random.words(5),
	createdAt: faker.date.recent().toISOString()
})

export const mockLoadPossibleHabits = (): HabitResult[] =>
	[...Array.from({ length: 5 })].map(_ => ({
		...mockHabitModel(),
		weekDays: [0, 2, 4]
	}))
