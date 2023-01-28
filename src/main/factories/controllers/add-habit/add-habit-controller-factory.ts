import { Controller } from '@/presentation/protocols'
import { AddHabitController } from '@/presentation/controllers'
import { makeDbAddHabit, makeAddHabitValidation } from '@/main/factories'

export const makeAddHabitController = (): Controller => {
	const habitValidation = makeAddHabitValidation()
	const dbAddHabit = makeDbAddHabit()

	return new AddHabitController(habitValidation, dbAddHabit)
}
