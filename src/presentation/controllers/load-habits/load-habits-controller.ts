import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers'
import { LoadHabits } from '@/domain/usecases'

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
			const parsedDate = new Date(date)
			await this.dbLoadHabits.load(parsedDate)
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
