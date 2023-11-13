import { Prisma, CheckIn as PrismaCheckInModel } from '@prisma/client'

export type CheckIn = PrismaCheckInModel

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>

  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>

  countByUserId(userId: string): Promise<number>
}
