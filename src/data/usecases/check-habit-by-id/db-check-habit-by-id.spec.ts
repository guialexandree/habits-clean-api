import { throwError } from '@/domain/test'
import { CheckHabitByIdSpy } from '@/presentation/test'
import { DbCheckHabitById } from './db-check-habit-by-id'

type SutTypes = {
	sut: DbCheckHabitById
	checkHabitByIdRepositorySpy: CheckHabitByIdSpy
}

const makeSut = (): SutTypes => {
	const checkHabitByIdRepositorySpy = new CheckHabitByIdSpy()

	const sut = new DbCheckHabitById(checkHabitByIdRepositorySpy)

	return {
		sut,
		checkHabitByIdRepositorySpy
	}
}

describe('Caso de uso - Adicionar Hábito', () => {
	test('Deve chamar checkHabitByIdRepository com habitId correto', async () => {
		const { sut, checkHabitByIdRepositorySpy } = makeSut()

		await sut.checkById('any_habit_id')

		expect(checkHabitByIdRepositorySpy.habitId).toEqual('any_habit_id')
	})

	test('Deve propagar o erro se checkHabitByIdRepository lançar exceção', async () => {
		const { sut, checkHabitByIdRepositorySpy } = makeSut()
		jest.spyOn(checkHabitByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)

		const promise = sut.checkById('any_habit_id')

		await expect(promise).rejects.toThrow()
	})

	test('Deve retornar o resultado do repositório com sucesso', async () => {
		const { sut, checkHabitByIdRepositorySpy } = makeSut()

		const isValid = await sut.checkById('any_habit_id')

		expect(checkHabitByIdRepositorySpy.result).toEqual(isValid)
	})
})
