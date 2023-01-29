import { ToggleDayHabit } from '@/domain/usecases/'
import {
	LoadDayHabitRepository,
	LoadDayRepository,
	RemoveDayHabitRepository
} from '@/data/protocols'

export class DbToggleDayHabit implements ToggleDayHabit {
	constructor (
		private readonly loadDayRepository: LoadDayRepository,
		private readonly loadDayHabitRepository: LoadDayHabitRepository,
		private readonly removeDayHabitRepository: RemoveDayHabitRepository
	) {}

	async toggle (habitId: string): Promise<void> {
		const today = new Date()
		const dayId = await this.loadDayRepository.loadOrCreate(today)
		const completedHabitId = await this.loadDayHabitRepository.loadCompletedHabit(habitId, dayId)
		if (completedHabitId) {
			await this.removeDayHabitRepository.removeById(completedHabitId)
		}
	}
}
