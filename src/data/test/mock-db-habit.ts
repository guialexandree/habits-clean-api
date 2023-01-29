import { AddHabit } from '@/domain/usecases'
import { AddDayHabitRepository, AddHabitRepository, LoadCompletedHabitsRepository, LoadDayHabitRepository, LoadDayRepository, LoadPossibleHabitsRepository, RemoveDayHabitRepository } from '@/data/protocols'
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

export class RemoveDayHabitRepositorySpy implements RemoveDayHabitRepository {
	dayHabitId: string
	callsCount = 0

	async removeById (dayHabitId: string): Promise<void> {
		this.dayHabitId = dayHabitId
		this.callsCount++
	}
}

export class LoadDayHabitRepositorySpy implements LoadDayHabitRepository {
	habitId: string
	dayId: string
	result = faker.datatype.uuid()

	async loadCompletedHabit (habitId: string, dayId: string): Promise<string> {
		this.habitId = habitId
		this.dayId = dayId

		return this.result
	}
}

export class AddDayHabitRepositorySpy implements AddDayHabitRepository {
	habitId: string
	dayId: string
	callsCount = 0

	async addDayHabit (habitId: string, dayId: string): Promise<void> {
		this.habitId = habitId
		this.dayId = dayId
		this.callsCount++
	}
}
