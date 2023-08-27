import fastify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastify()
app.get('/healthz', () => ({ message: 'Server online' }))

app.register(appRoutes)
