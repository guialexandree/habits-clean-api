import { AddHabit } from '@/domain/usecases'

export class DbAddHabitSpy implements AddHabit {
  addHabitParams: AddHabit.Params

  async add (addHabitParams: AddHabit.Params): Promise<boolean> {
    this.addHabitParams = addHabitParams
		return true
  }
}
