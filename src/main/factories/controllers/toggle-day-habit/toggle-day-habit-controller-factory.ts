import { Controller } from '@/presentation/protocols'
import { ToggleDayHabitController } from '@/presentation/controllers'
import { makeDbToggleDayHabit, makeToggleDayHabitValidation } from '@/main/factories'

export const makeToggleDayHabitController = (): Controller => {
	const toggleDayHabitValidation = makeToggleDayHabitValidation()
	const dbToggleDayHabit = makeDbToggleDayHabit()

	return new ToggleDayHabitController(toggleDayHabitValidation, dbToggleDayHabit)
}
