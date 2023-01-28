import { LoadHabits } from '@/domain/usecases'
import { LoadCompletedHabitsRepository, LoadPossibleHabitsRepository } from '@/data/protocols'

export class DbLoadHabits implements LoadHabits {
	constructor (
		private readonly loadPossibleHabitsRepository: LoadPossibleHabitsRepository,
		private readonly loadCompletedHabitsRepository: LoadCompletedHabitsRepository
	) {}

	async load (date: Date): Promise<LoadHabits.Result> {
		const possibleHabits = await this.loadPossibleHabitsRepository.loadByDateAndWeekDay(date, date.getDay())
		const completedHabits = await this.loadCompletedHabitsRepository.loadByDate(date)

		return {
			possibleHabits: possibleHabits || [],
			completedHabits: completedHabits || []
		}
	}
}
