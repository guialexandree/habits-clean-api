import { DbAddHabit } from '@/data/usecases'
import { AddHabit } from '@/domain/usecases'
import { HabitSqliteRepository } from '@/infra/db/sqlite'

export const makeDbAddHabit = (): AddHabit => {
	const AddHabitRepository = new HabitSqliteRepository()
	return new DbAddHabit(AddHabitRepository)
}
