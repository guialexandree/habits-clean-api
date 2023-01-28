export class BadlyFormattedParamError extends Error {
  constructor (paramName: string, message: string) {
    super(`${message} | Param: ${paramName}`)
    this.name = 'BadlyFormattedParamError'
  }
}
