import { AddHabit } from '@/domain/usecases'
import {
	AddHabitRepository,
	LoadCompletedHabitsRepository,
	LoadPossibleHabitsRepository,
	LoadDayHabitRepository,
	LoadDayRepository,
	RemoveDayHabitRepository,
	AddDayHabitRepository
} from '@/data/protocols'
import { prismaClient } from './prisma-client'
import { SqliteHelper } from './sqlite-helper'

export class HabitSqliteRepository implements AddHabitRepository, LoadPossibleHabitsRepository, LoadCompletedHabitsRepository, LoadDayRepository, LoadDayHabitRepository, RemoveDayHabitRepository, AddDayHabitRepository {
	async addHabit (data: AddHabit.Params): Promise<AddHabitRepository.Result> {
		const { title, createdAt, weekDays } = data

		const { id } = await prismaClient.habit.create({
			data: {
				title,
				created_at: createdAt,
				weekDays: {
					create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
				}
			}
		})

		return { id }
	}

	async loadByDateAndWeekDay (date: Date, weekDay: number): Promise<LoadPossibleHabitsRepository.Result> {
		const list = await prismaClient.habit.findMany({
			where: {
				created_at: {
					lte: date
				},
				weekDays: {
					some: {
						week_day: weekDay
					}
				}
			},
			include: {
				weekDays: true
			}
		})

		return !!list && SqliteHelper.mapCollection(list)
	}

	async loadByDate (date: Date): Promise<LoadCompletedHabitsRepository.Result> {
		const day = await prismaClient.day.findUnique({
      where: {
        date
      },
      include: {
        dayHabits: true
      }
    })

		return day?.dayHabits.map(item => item.habit_id)
	}

	async loadOrCreate (date: Date): Promise<string> {
		const today = date

    let day = await prismaClient.day.findUnique({
      where: {
        date: today
      }
    })

    if (!day) {
      day = await prismaClient.day.create({
        data: {
          date: today
        }
      })
    }

		return day.id
	}

	async loadCompletedHabit (habitId: string, dayId: string): Promise<string> {
		const dayHabit = await prismaClient.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: dayId,
          habit_id: habitId
        }
      }
    })

		return dayHabit?.id
	}

	async removeById (dayHabitId: string): Promise<void> {
		await prismaClient.dayHabit.delete({
			where: {
				id: dayHabitId
			}
		})
	}

	async addDayHabit (habitId: string, dayId: string): Promise<void> {
		await prismaClient.dayHabit.create({
			data: {
				day_id: dayId,
				habit_id: habitId
			}
		})
	}
}
