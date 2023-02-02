import { AddHabit, CheckHabitById, LoadHabits } from '@/domain/usecases'
import { mockLoadCompletedHabits, mockLoadPossibleHabits } from '@/domain/test'

export class AddHabitSpy implements AddHabit {
  addHabitParams: AddHabit.Params

  async add (addHabitParams: AddHabit.Params): Promise<boolean> {
    this.addHabitParams = addHabitParams
		return true
  }
}

export class LoadHabitsSpy implements LoadHabits {
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

export class CheckHabitByIdSpy implements CheckHabitById {
  habitId: string
	result = true

  async checkById (habitId: string): Promise<CheckHabitById.Result> {
    this.habitId = habitId
		return this.result
  }
}
