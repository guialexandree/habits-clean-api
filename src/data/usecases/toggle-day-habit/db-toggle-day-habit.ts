import { ToggleDayHabit } from '@/domain/usecases/'
import { LoadDayRepository } from '@/data/protocols'

export class DbToggleDayHabit implements ToggleDayHabit {
	constructor (private readonly loadDayRepository: LoadDayRepository) {}

	async toggle (habitId: string): Promise<void> {
		const today = new Date()
		await this.loadDayRepository.loadOrCreate(today)
	}
}
