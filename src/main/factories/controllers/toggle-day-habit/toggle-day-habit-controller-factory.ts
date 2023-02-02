import { Controller } from '@/presentation/protocols'
import { ToggleDayHabitController } from '@/presentation/controllers'
import { makeCheckHabitById, makeDbToggleDayHabit, makeToggleDayHabitValidation } from '@/main/factories'

export const makeToggleDayHabitController = (): Controller => {
	const toggleDayHabitValidation = makeToggleDayHabitValidation()
	const dbToggleDayHabit = makeDbToggleDayHabit()
	const dbCheckHabitById = makeCheckHabitById()

	return new ToggleDayHabitController(toggleDayHabitValidation, dbToggleDayHabit, dbCheckHabitById)
}
