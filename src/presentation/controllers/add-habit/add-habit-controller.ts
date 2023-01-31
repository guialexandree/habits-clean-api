import { AddHabit } from '@/domain/usecases'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddHabitController implements Controller {
	constructor (
		private readonly validation: Validation,
		private readonly dbAddHabit: AddHabit
	) {}

	async handle (request: AddHabitController.Request): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			const { title, weekDays } = request
			await this.dbAddHabit.add({
				title,
				weekDays
			})

			return created()
		} catch (error) {
			return serverError(error)
		}
	}
}

export namespace AddHabitController {
	export type Request = {
		title: string
		weekDays: number[]
	}
}
