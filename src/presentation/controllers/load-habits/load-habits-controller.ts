import { LoadHabits } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers'

export class LoadHabitsController implements Controller {
	constructor (
		private readonly validation: Validation,
		private readonly dbLoadHabits: LoadHabits
	) {}

	async handle (request: LoadHabitsController.Request): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			const { date } = request
			const parsedDate = new Date(
				Number(date.substring(0, 4)),
				Number(date.substring(5, 7)) - 1,
				Number(date.substring(8, 10)),
				23, 59, 59, 999
			)

			const habits = await this.dbLoadHabits.load(parsedDate)
			return ok(habits)
		} catch (error) {
			return serverError(error)
		}
	}
}

export namespace LoadHabitsController {
	export type Request = {
		date: string
	}
}
