import { Gym } from '@/repositories/gyms-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase
let gym: Gym

describe('Check in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gym = await gymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -21.156981,
      longitude: -47.969802,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn: checkIn01 } = await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -21.156981,
      userLongitude: -47.969802,
    })

    expect(checkIn01.id).toEqual(expect.any(String))

    const { checkIn: checkIn02 } = await sut.execute({
      gymId: gym.id,
      userId: 'user-02',
      validatedAt: new Date(),
      userLatitude: -21.156981,
      userLongitude: -47.969802,
    })

    expect(checkIn02.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -21.156981,
      userLongitude: -47.969802,
    })

    await expect(() =>
      sut.execute({
        gymId: gym.id,
        userId: 'user-01',
        userLatitude: -21.156981,
        userLongitude: -47.969802,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in the different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -21.156981,
      userLongitude: -47.969802,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -21.156981,
      userLongitude: -47.969802,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    const gym02 = await gymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -21.132794,
      longitude: -47.999288,
    })

    await expect(
      sut.execute({
        gymId: gym02.id,
        userId: 'user-01',
        userLatitude: -21.156981,
        userLongitude: -47.969802,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
