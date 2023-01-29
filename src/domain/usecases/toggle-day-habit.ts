export interface ToggleDayHabit {
	toggle: (habitId: string) => Promise<void>
}
