import { DateValidatorAdapter } from '@/infra/validators'
import { DateValidator } from '@/validation/protocols'

const makeSut = (): DateValidator => {
	return new DateValidatorAdapter()
}

describe('DateValidatorAdapter', () => {
  test('Deve retornar false se a data for inválida', () => {
		const sut = makeSut()

    expect(sut.isValid('22-12-2021')).toBe(false)
    expect(sut.isValid('22-01-2021')).toBe(false)
    expect(sut.isValid('2023-21-21')).toBe(false)
    expect(sut.isValid('2023-1-21')).toBe(false)
    expect(sut.isValid('2023-31-21')).toBe(false)
  })
})
