export interface CheckExistHabit {
	checkById: (habitId: string) => Promise<boolean>
}

export namespace CheckExistHabit {
	export type Params = string

	export type Result = boolean
}
