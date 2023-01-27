import { FastifyRequest, FastifyReply } from 'fastify'

export const cors = (req: FastifyRequest, res: FastifyReply, done): void => {
  void res.headers({
		'access-control-allow-origin': '*',
		'access-control-allow-headers': '*',
		'access-control-allow-methods': '*'
	})
	done()
}
