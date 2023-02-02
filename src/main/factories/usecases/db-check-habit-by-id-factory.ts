import { DbCheckHabitById } from '@/data/usecases'
import { CheckHabitById } from '@/domain/usecases'
import { HabitSqliteRepository } from '@/infra/db/sqlite'

export const makeCheckHabitById = (): CheckHabitById => {
	const habitRepository = new HabitSqliteRepository()
	return new DbCheckHabitById(habitRepository)
}
