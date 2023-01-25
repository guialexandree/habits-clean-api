import { AddHabit } from '@/domain/usecases'
import { AddHabitRepository, LoadPossibleHabitsRepository } from '@/data/protocols'
import { mockLoadPossibleHabits } from '@/domain/test/mock-habits'

export class AddHabitReposistorySpy implements AddHabitRepository {
	addHabitParams!: AddHabit.Params

	async add (dataHabit: AddHabit.Params): Promise<void> {
		this.addHabitParams = dataHabit
		await Promise.resolve()
	}
}

export class LoadPossibleHabitsRepositorySpy implements LoadPossibleHabitsRepository {
	date: Date
	weekDay: number
	result = mockLoadPossibleHabits()

	async load (date: Date, weekDay: number): Promise<LoadPossibleHabitsRepository.Result> {
		this.date = date
		this.weekDay = weekDay

		return this.result
	}
}
