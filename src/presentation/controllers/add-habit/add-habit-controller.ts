import { badRequest, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddHabitController implements Controller {
	constructor (private readonly validation: Validation) {}

	async handle (request: AddHabitController.Request): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			return null
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
