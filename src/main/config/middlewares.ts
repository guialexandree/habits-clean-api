import { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

export default (app: FastifyInstance): void => {
  void app.register(cors)
}
