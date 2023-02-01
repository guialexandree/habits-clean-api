import { mockSummaryModel } from '@/domain/test'
import { LoadSummary } from '@/domain/usecases'

export class DbLoadSummaryStub implements LoadSummary {
	result = [mockSummaryModel()]

  async load (): Promise<LoadSummary.Result> {
		return this.result
  }
}
