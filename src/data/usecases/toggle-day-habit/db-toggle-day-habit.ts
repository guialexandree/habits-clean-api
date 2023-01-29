import { ToggleDayHabit } from '@/domain/usecases/'
import { LoadCompletedHabitsRepository, LoadDayRepository } from '@/data/protocols'

export class DbToggleDayHabit implements ToggleDayHabit {
	constructor (
		private readonly loadDayRepository: LoadDayRepository,
		private readonly loadCompletedHabitsRepository: LoadCompletedHabitsRepository
	) {}

	async toggle (habitId: string): Promise<void> {
		const today = new Date()
		await this.loadDayRepository.loadOrCreate(today)
		await this.loadCompletedHabitsRepository.loadByDate(today)
	}
}
