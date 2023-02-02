import { ToggleDayHabit } from '@/domain/usecases/'
import {
	AddDayHabitRepository,
	CheckHabitByIdRepository,
	DateStartToday,
	LoadDayHabitRepository,
	LoadDayRepository,
	RemoveDayHabitRepository
} from '@/data/protocols'

export class DbToggleDayHabit implements ToggleDayHabit {
	constructor (
		private readonly loadDayRepository: LoadDayRepository,
		private readonly loadDayHabitRepository: LoadDayHabitRepository,
		private readonly removeDayHabitRepository: RemoveDayHabitRepository,
		private readonly addDayHabitRepository: AddDayHabitRepository,
		private readonly checkHabitByIdRepository: CheckHabitByIdRepository,
		private readonly dateAdapter: DateStartToday
	) {}

	async toggle (habitId: string): Promise<void> {
		await this.checkHabitByIdRepository.checkById(habitId)
		const today = this.dateAdapter.startOfToday()
		const dayId = await this.loadDayRepository.loadOrCreate(today)
		const completedHabitId = await this.loadDayHabitRepository.loadCompletedHabit(habitId, dayId)
		if (completedHabitId) {
			await this.removeDayHabitRepository.removeById(completedHabitId)
		} else {
			await this.addDayHabitRepository.addDayHabit(habitId, dayId)
		}
	}
}
