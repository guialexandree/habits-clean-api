import { LoadHabits } from '@/domain/usecases'
import { LoadPossibleHabitsRepository } from '@/data/protocols'

export class DbLoadHabits implements LoadHabits {
	constructor (private readonly loadPossibleHabitsRepository: LoadPossibleHabitsRepository) {}

	async load (date: Date, weekDay: number): Promise<LoadHabits.Result> {
		await this.loadPossibleHabitsRepository.load(date, weekDay)
		return []
	}
}
