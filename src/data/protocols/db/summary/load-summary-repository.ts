import { SummaryModel } from '@/domain/model'

export interface LoadSummaryRepository {
	load: () => Promise<LoadSummaryRepository.Result>
}

export namespace LoadSummaryRepository {
	export type Result = SummaryModel[]
}
