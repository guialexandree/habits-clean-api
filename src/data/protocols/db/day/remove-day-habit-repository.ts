export interface RemoveDayHabitRepository {
	removeById: (dayHabitId: string) => Promise<void>
}
