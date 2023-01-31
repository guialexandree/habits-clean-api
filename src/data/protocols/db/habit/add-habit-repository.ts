export interface AddHabitRepository {
	addHabit: (data: AddHabitRepository.Params) => Promise<AddHabitRepository.Result>
}

export namespace AddHabitRepository {
	export type Params = {
		title: string
		weekDays: number[]
		createdAt: Date
	}

	export type Result = {
		id: string
	}
}
