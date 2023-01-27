import Fastify, { FastifyInstance } from 'fastify'
import setupRoutes from '@/main/config/routes'
import setupMiddlewares from '@/main/config/middlewares'

export const setupApp = async (): Promise<FastifyInstance> => {
	const app = Fastify()
	setupMiddlewares(app)
	setupRoutes(app)
	return await Promise.resolve(app)
}
