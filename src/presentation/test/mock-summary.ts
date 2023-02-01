import { LoadSummary } from '@/domain/usecases'

export class DbLoadSummaryStub implements LoadSummary {
  async load (): Promise<LoadSummary.Result> {
		return null
  }
}
