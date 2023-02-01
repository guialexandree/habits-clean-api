import { SummaryModel } from '@/domain/model'
import { LoadSummaryRepository } from '@/data/protocols'
import { mockSummaryModel } from '@/domain/test'

export class LoadSummaryRepositorySpy implements LoadSummaryRepository {
	result = [mockSummaryModel()]

	async load (): Promise<SummaryModel[]> {
		return this.result
	}
}
