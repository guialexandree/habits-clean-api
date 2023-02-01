import { DbLoadSummary } from './db-load-summary'
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
		const loadSpy = jest.spyOn(loadSummaryRepositorySpy, 'load')

		await sut.load()

		expect(loadSpy).toHaveBeenCalled()
	})
})
