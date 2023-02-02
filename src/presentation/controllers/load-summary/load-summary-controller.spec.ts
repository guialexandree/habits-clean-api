import { LoadSummaryController } from './load-summary-controller'
import { throwError } from '@/domain/test'
import { ok, serverError } from '@/presentation/helpers'
import { LoadSummaryStub } from '@/presentation/test'

type SutTypes = {
	sut: LoadSummaryController
	dbLoadSummarySpy: LoadSummaryStub
}

const makeSut = (): SutTypes => {
	const dbLoadSummarySpy = new LoadSummaryStub()
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

	test('Deve retornar status 200 e o resumo com sucesso', async () => {
    const { sut, dbLoadSummarySpy } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual(ok(dbLoadSummarySpy.result))
  })
})
