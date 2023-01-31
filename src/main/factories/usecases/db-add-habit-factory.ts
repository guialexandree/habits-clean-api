import { DbAddHabit } from '@/data/usecases'
import { AddHabit } from '@/domain/usecases'
import { DateAdapter } from '@/infra/adapters'
import { HabitSqliteRepository } from '@/infra/db/sqlite'

export const makeDbAddHabit = (): AddHabit => {
	const addHabitRepository = new HabitSqliteRepository()
	const dateAdapter = new DateAdapter()
	return new DbAddHabit(addHabitRepository, dateAdapter)
}
