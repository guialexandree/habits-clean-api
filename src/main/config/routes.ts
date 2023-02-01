import { FastifyInstance } from 'fastify'
import { adaptRoute } from '@/main/adapters'
import {
	makeAddHabitController,
	makeLoadHabitsController,
	makeToggleDayHabitController,
	makeLoadSummaryController
} from '@/main/factories'

export default (app: FastifyInstance): void => {
	app.post('/habits', adaptRoute(makeAddHabitController()))
	app.get('/day', adaptRoute(makeLoadHabitsController()))
	app.patch('/habits/:habitId/toggle', adaptRoute(makeToggleDayHabitController()))
	app.get('/summary', adaptRoute(makeLoadSummaryController()))
}
