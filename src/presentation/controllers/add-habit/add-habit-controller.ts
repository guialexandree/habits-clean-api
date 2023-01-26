import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddHabitController implements Controller {
	constructor (private readonly validation: Validation) {}

	async handle (request: AddHabitController.Request): Promise<HttpResponse> {
		this.validation.validate(request)

		return { body: null, statusCode: 300 }
	}
}

export namespace AddHabitController {
	export type Request = {
		title: string
		weekDays: number[]
	}
}
