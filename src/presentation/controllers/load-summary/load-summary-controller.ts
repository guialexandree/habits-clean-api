import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { LoadSummary } from '@/domain/usecases'

export class LoadSummaryController implements Controller {
	constructor (private readonly dbLoadSummary: LoadSummary) {}

	async handle (): Promise<HttpResponse> {
		try {
			const summary = await this.dbLoadSummary.load()
			return ok(summary)
		} catch (error) {
			return serverError(error)
		}
	}
}
