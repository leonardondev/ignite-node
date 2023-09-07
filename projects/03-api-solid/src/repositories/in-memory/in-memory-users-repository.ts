import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) ?? null
  }

  async create(data: Prisma.UserCreateInput) {
    const newUser = {
      id: randomUUID(),
      created_at: new Date(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    }
    this.users.push(newUser)

    return newUser
  }
}
