import { FastifyRequest, FastifyReply } from 'fastify'
import { Controller } from '@/presentation/protocols'

export const adaptRoute = <T = any, P = { date: string }>(controller: Controller) => {
  return async (req: FastifyRequest<{ Body: T, Querystring: P }>, res: FastifyReply) => {
    const httpRequest = {
      ...(req.body || {}),
      ...(req.query || {})
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      await res
        .status(httpResponse.statusCode)
        .send(httpResponse.body)
    } else {
      await res
        .status(httpResponse.statusCode)
        .send({ error: httpResponse.body.message })
    }
  }
}
