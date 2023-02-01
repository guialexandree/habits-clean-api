import { LoadHabits } from '@/domain/usecases'
import { DateStartOf, LoadCompletedHabitsRepository, LoadPossibleHabitsRepository } from '@/data/protocols'

export class DbLoadHabits implements LoadHabits {
	constructor (
		private readonly loadPossibleHabitsRepository: LoadPossibleHabitsRepository,
		private readonly loadCompletedHabitsRepository: LoadCompletedHabitsRepository,
		private readonly dateAdapter: DateStartOf
	) {}

	async load (date: string): Promise<LoadHabits.Result> {
		const today = this.dateAdapter.startOf(date)
		const possibleHabits = await this.loadPossibleHabitsRepository.loadByDateAndWeekDay(today, today.getDay())
		const completedHabits = await this.loadCompletedHabitsRepository.loadByDate(today)

		return {
			possibleHabits: possibleHabits ?? [],
			completedHabits: completedHabits ?? []
		}
	}
}
