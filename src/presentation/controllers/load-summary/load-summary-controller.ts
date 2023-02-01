import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError } from '@/presentation/helpers'
import { LoadSummary } from '@/domain/usecases'

export class LoadSummaryController implements Controller {
	constructor (private readonly dbLoadSummary: LoadSummary) {}

	async handle (): Promise<HttpResponse> {
		try {
			await this.dbLoadSummary.load()
		} catch (error) {
			return serverError(error)
		}
	}
}
