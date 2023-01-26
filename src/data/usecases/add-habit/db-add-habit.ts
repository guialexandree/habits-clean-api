import { AddHabit } from '@/domain/usecases'
import { AddHabitRepository } from '@/data/protocols'

export class DbAddHabit implements AddHabit {
	constructor (private readonly dbAddReposistory: AddHabitRepository) {}

	async add (dataHabit: AddHabit.Params): Promise<boolean> {
		await this.dbAddReposistory.add(dataHabit)
		return true
	}
}
