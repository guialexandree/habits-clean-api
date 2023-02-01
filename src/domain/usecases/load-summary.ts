import { SummaryModel } from '@/domain/model'

export interface LoadSummary {
	load: () => Promise<LoadSummary.Result>
}

export namespace LoadSummary {
	export type Result = SummaryModel[]
}
