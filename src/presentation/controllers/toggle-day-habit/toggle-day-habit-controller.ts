import { ToggleDayHabit } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class ToggleDayHabitController implements Controller {
	constructor (
		private readonly validation: Validation,
		private readonly dbToggleDayHabit: ToggleDayHabit
	) {}

	async handle (request: ToggleDayHabitController.Request): Promise<HttpResponse> {
		this.validation.validate(request)

		const { habitId } = request
		await this.dbToggleDayHabit.toggle(habitId)
		return null
	}
}

export namespace ToggleDayHabitController {
	export type Request = {
		habitId: string
	}
}
