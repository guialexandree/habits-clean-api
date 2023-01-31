import { AddHabit } from '@/domain/usecases'
import { AddHabitRepository, DateStartToday } from '@/data/protocols'

export class DbAddHabit implements AddHabit {
	constructor (
		private readonly addHabitReposistory: AddHabitRepository,
		private readonly dateAdapter: DateStartToday
	) {}

	async add (dataHabit: AddHabit.Params): Promise<boolean> {
		const createdAt = this.dateAdapter.startOfToday()

		await this.addHabitReposistory.addHabit({
			...dataHabit,
			createdAt
		})

		return true
	}
}
