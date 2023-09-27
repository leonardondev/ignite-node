import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memroy-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn: CheckIn01 } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(CheckIn01.id).toEqual(expect.any(String))

    const { checkIn: CheckIn02 } = await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
      validatedAt: new Date(),
    })

    expect(CheckIn02.id).toEqual(expect.any(String))
  })
})
