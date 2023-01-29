import { ToggleDayHabit } from '@/domain/usecases/'
import {
	LoadCompletedHabitRepository,
	LoadDayRepository,
	RemoveDayHabitRepository
} from '@/data/protocols'

export class DbToggleDayHabit implements ToggleDayHabit {
	constructor (
		private readonly loadDayRepository: LoadDayRepository,
		private readonly loadCompletedHabitsRepository: LoadCompletedHabitRepository,
		private readonly removeDayHabitRepository: RemoveDayHabitRepository
	) {}

	async toggle (habitId: string): Promise<void> {
		const today = new Date()
		const dayId = await this.loadDayRepository.loadOrCreate(today)
		await this.loadCompletedHabitsRepository.loadByDate(today)
		await this.removeDayHabitRepository.removeById(dayId)
	}
}
