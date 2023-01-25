export type HabitModel = {
	id: string
	title: string
	createdAt: string
}

export type HabitResult = HabitModel & {
	weekDays: number[]
}
