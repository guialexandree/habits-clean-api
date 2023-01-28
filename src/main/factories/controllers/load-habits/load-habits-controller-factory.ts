import { Controller } from '@/presentation/protocols'
import { LoadHabitsController } from '@/presentation/controllers'
import { makeDbLoadHabits, makeLoadHabitsValidation } from '@/main/factories'

export const makeLoadHabitsController = (): Controller => {
	const loadHabitValidation = makeLoadHabitsValidation()
	const dbLoadHabits = makeDbLoadHabits()

	return new LoadHabitsController(loadHabitValidation, dbLoadHabits)
}
