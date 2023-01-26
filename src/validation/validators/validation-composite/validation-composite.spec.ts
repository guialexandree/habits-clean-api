import { ValidationComposite } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'

const field = faker.random.word()

interface SutTypes {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies: ValidationSpy[] = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)

  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  test('Deve retornar o erro se a validação falhar', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(validationSpies[1].error)
  })

  test('Deve retornar o primeiro erro se a validação falhar mais de uma vez', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingParamError(field)

    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toEqual(validationSpies[0].error)
  })

  test('Deve retornar null se todas as validações ocorrerem com sucesso', () => {
    const { sut } = makeSut()

    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toBeFalsy()
  })
})
