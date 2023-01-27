import Fastify, { FastifyInstance } from 'fastify'
import setupRoutes from '@/main/config/routes'

export const setupApp = async (): Promise<FastifyInstance> => {
	const app = Fastify()
	setupRoutes(app)
	return await Promise.resolve(app)
}
