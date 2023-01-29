import { AddHabit } from '@/domain/usecases'
import { AddHabitRepository, LoadCompletedHabitsRepository, LoadDayRepository, LoadPossibleHabitsRepository } from '@/data/protocols'
import { mockLoadPossibleHabits } from '@/domain/test/mock-habits'
import faker from 'faker'

export class AddHabitReposistorySpy implements AddHabitRepository {
	addHabitParams!: AddHabit.Params

	async addHabit (dataHabit: AddHabit.Params): Promise<AddHabitRepository.Result> {
		this.addHabitParams = dataHabit
		return { id: faker.datatype.uuid() }
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
	result = [faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid()]

	async loadByDate (date: Date): Promise<LoadCompletedHabitsRepository.Result> {
		this.date = date

		return this.result
	}
}

export class LoadDayRepositorySpy implements LoadDayRepository {
	date: Date
	result = faker.datatype.uuid()

	async loadOrCreate (date: Date): Promise<string> {
		this.date = date

		return this.result
	}
}
