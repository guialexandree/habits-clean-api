import { AddHabit } from '@/domain/usecases'

export interface AddHabitRepository {
	add: (data: AddHabit.Params) => Promise<AddHabitRepository.Result>
}

export namespace AddHabitRepository {
	export type Params = AddHabit.Params

	export type Result = {
		id: string
	}
}
