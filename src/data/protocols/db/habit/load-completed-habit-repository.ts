export interface LoadCompletedHabitRepository {
	loadByDate: (date: Date) => Promise<LoadCompletedHabitRepository.Result>
}

export namespace LoadCompletedHabitRepository {
	export type Result = string[]
}
