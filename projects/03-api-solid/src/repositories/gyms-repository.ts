import { Prisma, Gym as PrismaGymModel } from '@prisma/client'

export type Gym = PrismaGymModel

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>

  create(data: Prisma.GymCreateInput): Promise<Gym>
}
