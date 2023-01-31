import { AddHabit } from '@/domain/usecases'
import { AddHabitRepository } from '@/data/protocols'

export class DbAddHabit implements AddHabit {
	constructor (private readonly addHabitReposistory: AddHabitRepository) {}

	async add (dataHabit: AddHabit.Params): Promise<boolean> {
		await this.addHabitReposistory.addHabit({
			...dataHabit,
			createdAt: new Date()
		})
		return true
	}
}
