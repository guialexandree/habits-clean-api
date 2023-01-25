import { AddHabit } from '@/domain/usecases'
import { AddHabitRepository, LoadCompletedHabitsRepository, LoadPossibleHabitsRepository } from '@/data/protocols'
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

	async loadByDateAndWeekDay (date: Date, weekDay: number): Promise<LoadPossibleHabitsRepository.Result> {
		this.date = date
		this.weekDay = weekDay

		return this.result
	}
}

export class LoadCompletedHabitsRepositorySpy implements LoadCompletedHabitsRepository {
	date: Date
	result = [1, 2, 3, 5, 8, 13]

	async loadByDate (date: Date): Promise<LoadCompletedHabitsRepository.Result> {
		this.date = date

		return this.result
	}
}
