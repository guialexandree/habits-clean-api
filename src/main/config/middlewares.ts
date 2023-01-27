import { FastifyInstance } from 'fastify'
import { cors } from '@/main/middlewares'

export default (app: FastifyInstance): void => {
  void app.addHook('onRequest', cors)
}
