export interface AddDayHabitRepository {
	addDayHabit: (habitId: string, dayId: string) => Promise<void>
}
