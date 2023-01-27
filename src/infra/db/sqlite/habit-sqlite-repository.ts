import { AddHabit } from '@/domain/usecases'
import { AddHabitRepository } from '@/data/protocols'
import { prismaClient } from './prisma-client'

export class HabitSqliteRepository implements AddHabitRepository {
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
}
