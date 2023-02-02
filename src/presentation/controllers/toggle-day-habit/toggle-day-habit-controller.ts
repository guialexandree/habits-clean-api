import { CheckHabitById, ToggleDayHabit } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class ToggleDayHabitController implements Controller {
	constructor (
		private readonly validation: Validation,
		private readonly dbToggleDayHabit: ToggleDayHabit,
		private readonly dbCheckHabitById: CheckHabitById
	) {}

	async handle (request: ToggleDayHabitController.Request): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const { habitId } = request
			await this.dbCheckHabitById.checkById(habitId)
			await this.dbToggleDayHabit.toggle(habitId)

			return ok(null)
		} catch (error) {
			return serverError(error)
		}
	}
}

export namespace ToggleDayHabitController {
	export type Request = {
		habitId: string
	}
}
