import { FastifyInstance } from 'fastify'
import { makeHabitController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'

export const habitRoutes = (router: FastifyInstance): void => {
  router.post('/habits', adaptRoute(makeHabitController()))
}
