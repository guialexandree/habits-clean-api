import { LoadSummaryController } from './load-summary-controller'
import { LoadSummaryRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import { serverError } from '@/presentation/helpers'

type SutTypes = {
	sut: LoadSummaryController
	dbLoadSummarySpy: LoadSummaryRepositorySpy
}

const makeSut = (): SutTypes => {
	const dbLoadSummarySpy = new LoadSummaryRepositorySpy()
	const sut = new LoadSummaryController(dbLoadSummarySpy)

	return {
		sut,
		dbLoadSummarySpy
	}
}

describe('AddHabit Controller', () => {
	test('Deve chamar dbLoadSummary', async () => {
    const { sut, dbLoadSummarySpy } = makeSut()
		const loadSpy = jest.spyOn(dbLoadSummarySpy, 'load')

    await sut.handle()

    expect(loadSpy).toHaveBeenCalled()
  })

	test('Deve retornar status 500 se LoadSummarySpy lançar exceção', async () => {
    const { sut, dbLoadSummarySpy } = makeSut()
    jest
      .spyOn(dbLoadSummarySpy, 'load')
      .mockImplementationOnce(throwError)

    const response = await sut.handle()

    expect(response).toEqual(serverError(new Error()))
  })
})