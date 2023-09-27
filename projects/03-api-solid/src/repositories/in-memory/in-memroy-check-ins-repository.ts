import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    console.log(data.validated_at)

    const newCheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      gym_id: data.gym_id,
      user_id: data.user_id,
    } as CheckIn

    this.checkIns.push(newCheckIn)

    return newCheckIn
  }
}
