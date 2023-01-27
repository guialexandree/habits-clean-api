import { Controller } from '@/presentation/protocols'
import { AddHabitController } from '@/presentation/controllers'
import { makeDbAddHabit, makeHabitValidation } from '@/main/factories'

export const makeHabitController = (): Controller => {
	const habitValidation = makeHabitValidation()
	const dbAddHabit = makeDbAddHabit()

	return new AddHabitController(habitValidation, dbAddHabit)
}
