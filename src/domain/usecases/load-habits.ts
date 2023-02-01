import { HabitModel } from '@/domain/model'

export interface LoadHabits {
	load: (date: LoadHabits.Params) => Promise<LoadHabits.Result>
}

export namespace LoadHabits {
	export type Params = string

	export type Result = {
		possibleHabits: HabitModel[]
		completedHabits: string[]
	}
}
