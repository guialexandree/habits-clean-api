export interface CheckHabitById {
	checkById: (habitId: string) => Promise<CheckHabitById.Result>
}

export namespace CheckHabitById {
	export type Params = string

	export type Result = boolean
}
