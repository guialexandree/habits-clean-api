import { CheckHabitById } from '@/domain/usecases'
import { CheckHabitByIdRepository } from '@/data/protocols'

export class DbCheckHabitById implements CheckHabitById {
	constructor (
		private readonly checkHabitByIdRepository: CheckHabitByIdRepository
	) {}

	async checkById (habitId: string): Promise<CheckHabitById.Result> {
		const isValid = await this.checkHabitByIdRepository.checkById(habitId)
		return isValid
	}
}
