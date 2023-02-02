import { CheckHabitById, ToggleDayHabit } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
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

			const isValid = await this.dbCheckHabitById.checkById(habitId)
			if (!isValid) {
				return forbidden(new InvalidParamError('surveyId'))
			}

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
