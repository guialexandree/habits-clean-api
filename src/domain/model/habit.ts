export type HabitModel = {
	id: string
	title: string
	createdAt: Date
}

export type HabitResult = HabitModel & {
	weekDays: number[]
}
