import { AddHabit } from '@/domain/usecases'

export interface AddHabitRepository {
	add: (data: AddHabit.Params) => Promise<void>
}

export namespace AddHabitRepository {
	export type Params = AddHabit.Params
}
