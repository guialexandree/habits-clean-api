import { HabitModel } from '@/domain/model'

export type HabitResult = HabitModel & {
	weekDays: number[]
}
