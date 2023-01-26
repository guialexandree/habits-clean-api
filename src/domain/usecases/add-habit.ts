import { HabitResult } from '@/domain/model'

export interface AddHabit {
	add: (dataHabit: AddHabit.Params) => Promise<boolean>
}

export namespace AddHabit {
	export type Params = Omit<HabitResult, 'id'>
}
