import { DbLoadHabits } from '@/data/usecases'
import { LoadHabits } from '@/domain/usecases'
import { DateAdapter } from '@/infra/adapters'
import { HabitSqliteRepository } from '@/infra/db/sqlite'

export const makeDbLoadHabits = (): LoadHabits => {
	const habitsRepository = new HabitSqliteRepository()
	const dateAdapter = new DateAdapter()

	return new DbLoadHabits(
		habitsRepository,
		habitsRepository,
		dateAdapter,
		dateAdapter
		)
}
