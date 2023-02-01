import { DbLoadSummary } from './db-load-summary'
import { throwError } from '@/domain/test'
import { LoadSummaryRepositorySpy } from '@/data/test'

type SutTypes = {
	sut: DbLoadSummary
	loadSummaryRepositorySpy: LoadSummaryRepositorySpy
}

const makeSut = (): SutTypes => {
	const loadSummaryRepositorySpy = new LoadSummaryRepositorySpy()

	const sut = new DbLoadSummary(loadSummaryRepositorySpy)

	return {
		sut,
		loadSummaryRepositorySpy
	}
}

describe('Caso de uso - Adicionar Hábito', () => {
	test('Deve chamar loadSummaryRepository com os valores corretos', async () => {
		const { sut, loadSummaryRepositorySpy } = makeSut()
		const loadSpy = jest.spyOn(loadSummaryRepositorySpy, 'loadYear')

		await sut.load()

		expect(loadSpy).toHaveBeenCalled()
	})

	test('Deve propagar o erro se loadSummaryRepository lançar exceção', async () => {
		const { sut, loadSummaryRepositorySpy } = makeSut()
		jest.spyOn(loadSummaryRepositorySpy, 'loadYear').mockImplementationOnce(throwError)

		const promise = sut.load()

		await expect(promise).rejects.toThrow()
	})

	test('Deve retornar o resultado de loadSummaryRepository com sucesso', async () => {
		const { sut, loadSummaryRepositorySpy } = makeSut()

		const summary = await sut.load()

		expect(summary).toEqual(loadSummaryRepositorySpy.result)
	})

	test('Deve retornar um lista vazia se o repositório não retornar dados', async () => {
		const { sut, loadSummaryRepositorySpy } = makeSut()
		loadSummaryRepositorySpy.result = null

		let summary = await sut.load()
		expect(summary).toEqual([])

		loadSummaryRepositorySpy.result = undefined
		summary = await sut.load()
		expect(summary).toEqual([])
	})
})
