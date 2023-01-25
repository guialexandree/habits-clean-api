import { HabitResult } from '@/domain/model'

export interface LoadPossibleHabitsRepository {
	loadByDateAndWeekDay: (date: Date, weekDay: number) => Promise<LoadPossibleHabitsRepository.Result>
}

export namespace LoadPossibleHabitsRepository {
	export type Result = HabitResult[]
}
