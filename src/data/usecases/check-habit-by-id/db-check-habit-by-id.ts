import { CheckHabitById } from '@/domain/usecases'
import { CheckHabitByIdRepository } from '@/data/protocols'

export class DbCheckHabitById implements CheckHabitById {
	constructor (
		private readonly checkHabitByIdRepository: CheckHabitByIdRepository
	) {}

	async checkById (habitId: string): Promise<CheckHabitById.Result> {
		return null
	}
}
