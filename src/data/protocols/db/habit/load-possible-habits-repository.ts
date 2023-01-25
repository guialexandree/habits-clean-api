import { HabitResult } from '@/domain/model'

export interface LoadPossibleHabitsRepository {
	load: (date: Date, weekDay: number) => Promise<LoadPossibleHabitsRepository.Result>
}

export namespace LoadPossibleHabitsRepository {
	export type Result = HabitResult[]
}
