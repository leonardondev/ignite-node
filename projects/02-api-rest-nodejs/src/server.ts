import fastify from 'fastify'
import { randomUUID } from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const server = fastify()

server.get('/teste', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: randomUUID(),
      title: 'Transação de teste',
      amount: 1000.0,
    })
    .returning('*')
  return transaction
})

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running on port 3333')
  })
