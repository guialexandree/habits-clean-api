import { AddHabit, LoadHabits } from '@/domain/usecases'
import { mockLoadCompletedHabits, mockLoadPossibleHabits } from '@/domain/test'

export class DbAddHabitSpy implements AddHabit {
  addHabitParams: AddHabit.Params

  async add (addHabitParams: AddHabit.Params): Promise<boolean> {
    this.addHabitParams = addHabitParams
		return true
  }
}

export class DbLoadHabitsSpy implements LoadHabits {
  dateParams: Date
	result = {
		possibleHabits: mockLoadPossibleHabits(),
		completedHabits: mockLoadCompletedHabits()
	}

  async load (date: Date): Promise<LoadHabits.Result> {
    this.dateParams = date
		return this.result
  }
}
