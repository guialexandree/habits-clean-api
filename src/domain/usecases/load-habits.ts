import { HabitModel } from '@/domain/model'

export interface LoadHabits {
	load: (date: Date, weekDay: number) => Promise<LoadHabits.Result>
}

export namespace LoadHabits {
	export type Result = {
		possibleHabits: HabitModel[]
	}
}
