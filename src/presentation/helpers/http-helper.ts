import { InternalServerError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new InternalServerError(error.stack)
})

export const created = (): HttpResponse => ({
  statusCode: 201,
  body: null
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
