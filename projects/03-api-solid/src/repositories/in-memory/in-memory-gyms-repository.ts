import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { Gym, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  private gyms: Gym[] = []

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) ?? null
  }

  async create(data: Prisma.GymCreateInput) {
    const newGym = {
      id: randomUUID(),
      created_at: new Date(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
    } as Gym

    this.gyms.push(newGym)

    return newGym
  }
}
