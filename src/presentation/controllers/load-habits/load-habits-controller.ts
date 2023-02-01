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
			const habits = await this.dbLoadHabits.load(date)

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
