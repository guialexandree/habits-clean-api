import { DbToggleDayHabit } from '@/data/usecases'
import { ToggleDayHabit } from '@/domain/usecases'
import { DateAdapter } from '@/infra/adapters'
import { HabitSqliteRepository } from '@/infra/db/sqlite'

export const makeDbToggleDayHabit = (): ToggleDayHabit => {
	const habitsRepository = new HabitSqliteRepository()
	const dateAdapter = new DateAdapter()
	return new DbToggleDayHabit(
		habitsRepository,
		habitsRepository,
		habitsRepository,
		habitsRepository,
		dateAdapter
	)
}
