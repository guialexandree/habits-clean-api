import { ToggleDayHabit } from '@/domain/usecases/'
import {
	AddDayHabitRepository,
	LoadDayHabitRepository,
	LoadDayRepository,
	RemoveDayHabitRepository
} from '@/data/protocols'

// TODO: criari checkHabitIsValid()
export class DbToggleDayHabit implements ToggleDayHabit {
	constructor (
		private readonly loadDayRepository: LoadDayRepository,
		private readonly loadDayHabitRepository: LoadDayHabitRepository,
		private readonly removeDayHabitRepository: RemoveDayHabitRepository,
		private readonly addDayHabitRepository: AddDayHabitRepository
	) {}

	async toggle (habitId: string): Promise<void> {
		const today = new Date()
		const parsedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
		const dayId = await this.loadDayRepository.loadOrCreate(parsedDate)
		const completedHabitId = await this.loadDayHabitRepository.loadCompletedHabit(habitId, dayId)
		if (completedHabitId) {
			await this.removeDayHabitRepository.removeById(completedHabitId)
		} else {
			await this.addDayHabitRepository.addDayHabit(habitId, dayId)
		}
	}
}
