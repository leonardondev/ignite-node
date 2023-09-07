import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { registerUseCases } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  /* executando use-case */
  try {
    await registerUseCases({ name, email, password })
    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send({
      message: error.message,
    })
  }
}
