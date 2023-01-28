import { HabitModel } from '@/domain/model'

export interface LoadHabits {
	load: (date: Date) => Promise<LoadHabits.Result>
}

export namespace LoadHabits {
	export type Params = {
		date: Date
	}

	export type Result = {
		possibleHabits: HabitModel[]
		completedHabits: string[]
	}
}
