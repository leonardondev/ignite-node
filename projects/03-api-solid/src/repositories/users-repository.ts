import { Prisma, User as PrismaUserModel } from '@prisma/client'

export type User = PrismaUserModel

export interface UsersRepository {
  findById(id: string): Promise<User | null>

  findByEmail(email: string): Promise<User | null>

  create(data: Prisma.UserCreateInput): Promise<User>
}
