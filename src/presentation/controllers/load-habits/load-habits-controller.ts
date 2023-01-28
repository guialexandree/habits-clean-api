import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class LoadHabitsController implements Controller {
	constructor (
		private readonly validation: Validation
	) {}

	async handle (request: LoadHabitsController.Request): Promise<HttpResponse> {
		const error = this.validation.validate(request)
		if (error) {
			return badRequest(error)
		}
	}
}

export namespace LoadHabitsController {
	export type Request = {
		date: string
	}
}
