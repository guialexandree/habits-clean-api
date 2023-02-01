import { Controller } from '@/presentation/protocols'
import { LoadSummaryController } from '@/presentation/controllers'
import { makeDbLoadSummary } from '@/main/factories'

export const makeLoadSummaryController = (): Controller => {
	const dbLoadSummary = makeDbLoadSummary()

	return new LoadSummaryController(dbLoadSummary)
}
