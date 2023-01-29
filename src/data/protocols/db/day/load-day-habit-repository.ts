export interface LoadDayHabitRepository {
	loadCompletedHabit: (habitId: string, dayId: string) => Promise<string>
}
