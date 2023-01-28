import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadHabitsController implements Controller {
	constructor (
		private readonly validation: Validation
	) {}

	async handle (request: LoadHabitsController.Request): Promise<HttpResponse> {
		this.validation.validate(request)
		return null
	}
}

export namespace LoadHabitsController {
	export type Request = {
		date: string
	}
}
