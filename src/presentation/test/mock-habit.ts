import { AddHabit, CheckHabitById, LoadHabits } from '@/domain/usecases'
import { mockLoadCompletedHabits, mockLoadPossibleHabits } from '@/domain/test'

export class DbAddHabitSpy implements AddHabit {
  addHabitParams: AddHabit.Params

  async add (addHabitParams: AddHabit.Params): Promise<boolean> {
    this.addHabitParams = addHabitParams
		return true
  }
}

export class DbLoadHabitsSpy implements LoadHabits {
  dateParams: string
	result = {
		possibleHabits: mockLoadPossibleHabits(),
		completedHabits: mockLoadCompletedHabits()
	}

  async load (date: string): Promise<LoadHabits.Result> {
    this.dateParams = date
		return this.result
  }
}

export class DbCheckHabitByIdSpy implements CheckHabitById {
  habitId: string

  async checkById (habitId: string): Promise<CheckHabitById.Result> {
    this.habitId = habitId
		return true
  }
}
