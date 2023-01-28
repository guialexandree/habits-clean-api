import { AddHabit } from '@/domain/usecases'
import { AddHabitRepository, LoadCompletedHabitsRepository, LoadPossibleHabitsRepository } from '@/data/protocols'
import { prismaClient } from './prisma-client'
import { SqliteHelper } from './sqlite-helper'

export class HabitSqliteRepository implements AddHabitRepository, LoadPossibleHabitsRepository, LoadCompletedHabitsRepository {
	async add (data: AddHabit.Params): Promise<AddHabitRepository.Result> {
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

		return day?.dayHabits && day?.dayHabits.map(item => item.habit_id)
	}
}
