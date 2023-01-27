import { setupApp } from '@/main/config/app'
import { FastifyInstance } from 'fastify'

let app: FastifyInstance

describe('CORS Middleware', () => {
	beforeAll(async () => {
    app = await setupApp()
  })

  test('Deve ativar o cors', async () => {
    app.get('/test_cors', _ => ({ field: 'any_value' }))

		const { headers } = await app.inject({
			method: 'GET',
			url: 'test_cors'
		})

		expect(headers['access-control-allow-origin']).toBe('*')
		expect(headers['access-control-allow-headers']).toBe('*')
		expect(headers['access-control-allow-methods']).toBe('*')
  })
})
