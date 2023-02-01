import { SummaryModel } from '@/domain/model'

export interface LoadSummaryRepository {
	loadYear: () => Promise<LoadSummaryRepository.Result>
}

export namespace LoadSummaryRepository {
	export type Result = SummaryModel[]
}
