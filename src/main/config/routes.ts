import { FastifyInstance } from 'fastify'
import { adaptRoute } from '@/main/adapters'
import { makeAddHabitController, makeLoadHabitsController } from '@/main/factories'

export default (app: FastifyInstance): void => {
	app.post('/habits', adaptRoute(makeAddHabitController()))
	app.get('/day', adaptRoute(makeLoadHabitsController()))
}
