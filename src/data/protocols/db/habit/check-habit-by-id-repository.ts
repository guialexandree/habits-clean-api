export interface CheckHabitByIdRepository {
	checkById: (habitId: string) => Promise<CheckHabitByIdRepository.Result>
}

export namespace CheckHabitByIdRepository {
	export type Result = boolean
}
