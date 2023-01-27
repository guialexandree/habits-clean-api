import { FastifyInstance } from 'fastify'
import { adaptRoute } from '@/main/adapters'
import { makeHabitController } from '@/main/factories'

export default (app: FastifyInstance): void => {
	app.post('/habits', adaptRoute(makeHabitController()))
}
