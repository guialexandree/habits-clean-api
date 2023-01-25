import { AddHabit } from '@/domain/usecases'
import { AddHabitRepository } from '@/data/protocols'

export class AddHabitReposistorySpy implements AddHabitRepository {
	addHabitParams!: AddHabit.Params

	async add (dataHabit: AddHabit.Params): Promise<void> {
		this.addHabitParams = dataHabit
		await Promise.resolve()
	}
}
