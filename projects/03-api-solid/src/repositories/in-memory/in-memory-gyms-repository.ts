import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { Gym, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  private gyms: Gym[] = []

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) ?? null
  }

  async searchMany(query: string, page: number) {
    return this.gyms
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.GymCreateInput) {
    const newGym = {
      id: data.id ?? randomUUID(),
      created_at: new Date(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
    } as Gym

    this.gyms.push(newGym)

    return newGym
  }
}
