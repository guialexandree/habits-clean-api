import { HabitModel } from '../habit'

export interface AddHabit {
	add: (dataHabit: AddHabit.Params) => Promise<void>
}

export namespace AddHabit {
	export type Params = Omit<HabitModel, 'id'>
}
