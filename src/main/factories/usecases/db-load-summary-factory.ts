import { LoadSummary } from '@/domain/usecases'
import { DbLoadSummary } from '@/data/usecases'
import { HabitSqliteRepository } from '@/infra/db/sqlite'

export const makeDbLoadSummary = (): LoadSummary => {
	const habitRepository = new HabitSqliteRepository()
	return new DbLoadSummary(habitRepository)
}
