export interface LoadCompletedHabitsRepository {
	loadByDate: (date: Date) => Promise<LoadCompletedHabitsRepository.Result>
}

export namespace LoadCompletedHabitsRepository {
	export type Result = string[]
}
