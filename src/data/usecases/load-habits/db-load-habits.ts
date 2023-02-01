import { LoadHabits } from '@/domain/usecases'
import { DateStartOf, DateWeekDay, LoadCompletedHabitsRepository, LoadPossibleHabitsRepository } from '@/data/protocols'

export class DbLoadHabits implements LoadHabits {
	constructor (
		private readonly loadPossibleHabitsRepository: LoadPossibleHabitsRepository,
		private readonly loadCompletedHabitsRepository: LoadCompletedHabitsRepository,
		private readonly dateStartOfAdapter: DateStartOf,
		private readonly dateWeekDayAdapter: DateWeekDay
	) {}

	async load (date: string): Promise<LoadHabits.Result> {
		const today = this.dateStartOfAdapter.startOf(date)
		this.dateWeekDayAdapter.weekDay(today)
		const possibleHabits = await this.loadPossibleHabitsRepository.loadByDateAndWeekDay(today, today.getDay())
		const completedHabits = await this.loadCompletedHabitsRepository.loadByDate(today)

		return {
			possibleHabits: possibleHabits ?? [],
			completedHabits: completedHabits ?? []
		}
	}
}
