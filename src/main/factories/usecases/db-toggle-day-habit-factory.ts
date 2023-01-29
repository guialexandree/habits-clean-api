import { DbToggleDayHabit } from '@/data/usecases'
import { ToggleDayHabit } from '@/domain/usecases'
import { HabitSqliteRepository } from '@/infra/db/sqlite'

export const makeDbToggleDayHabit = (): ToggleDayHabit => {
	const habitsRepository = new HabitSqliteRepository()
	return new DbToggleDayHabit(
		habitsRepository,
		habitsRepository,
		habitsRepository,
		habitsRepository
		)
}
