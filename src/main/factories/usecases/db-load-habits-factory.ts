import { DbLoadHabits } from '@/data/usecases'
import { LoadHabits } from '@/domain/usecases'
import { HabitSqliteRepository } from '@/infra/db/sqlite'

export const makeDbLoadHabits = (): LoadHabits => {
	const habitsRepository = new HabitSqliteRepository()
	return new DbLoadHabits(habitsRepository, habitsRepository)
}
