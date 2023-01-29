export interface AddDayHabitRepository {
	add: (data: AddDayHabitRepository.Params) => Promise<void>
}

export namespace AddDayHabitRepository {
	export type Params = {
		habitId: string
		dayId: string
	}
}
