import { LoadSummary } from '@/domain/usecases'
import { LoadSummaryRepository } from '@/data/protocols'

export class DbLoadSummary implements LoadSummary {
	constructor (
		private readonly loadSummaryRepository: LoadSummaryRepository
	) {}

	async load (): Promise<LoadSummary.Result> {
		const summary = await this.loadSummaryRepository.load()

		return summary
	}
}
