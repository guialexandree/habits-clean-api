export interface AddHabit {
	add: (dataHabit: AddHabit.Params) => Promise<boolean>
}

export namespace AddHabit {
	export type Params = {
		title: string
		weekDays: number[]
	}
}
