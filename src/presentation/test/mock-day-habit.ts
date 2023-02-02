import { ToggleDayHabit } from '@/domain/usecases'

export class ToggleDayHabitSpy implements ToggleDayHabit {
  habitId: string

  async toggle (habitId: string): Promise<void> {
    this.habitId = habitId
  }
}
