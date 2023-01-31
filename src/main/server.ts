import 'module-alias/register'
import { setupApp } from '@/main/config/app'
require('dotenv').config()

setupApp()
	.then(async app => {
		await app
			.listen({
				port: Number(process.env.PORT),
				host: '0.0.0.0'
			})
		console.log(`Servidor rodando na porta ${String(process.env.PORT)}\nProcesso: ${process.pid}`)
	})
	.catch(error => { console.error(error) })
