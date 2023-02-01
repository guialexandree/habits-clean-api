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
		const loadSpy = jest.spyOn(loadSummaryRepositorySpy, 'load')

		await sut.load()

		expect(loadSpy).toHaveBeenCalled()
	})

	test('Deve propagar o erro se dbLoadSummaryRepository lançar exceção', async () => {
		const { sut, loadSummaryRepositorySpy } = makeSut()
		jest.spyOn(loadSummaryRepositorySpy, 'load').mockImplementationOnce(throwError)

		const promise = sut.load()

		await expect(promise).rejects.toThrow()
	})
})
