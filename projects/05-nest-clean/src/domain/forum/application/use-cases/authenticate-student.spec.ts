import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { AuthenticateStudentUseCase } from './authenticate-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const newStudent = makeStudent({
      email: 'test@example.com',
      password: await fakeHasher.hash('123456'),
    })

    const student = await inMemoryStudentsRepository.create(newStudent)

    const result = await sut.execute({
      email: 'test@example.com',
      password: '123456',
    })

    const payload = {
      sub: student.id.toValue(),
    }
    const accessToken = await fakeEncrypter.encrypt(payload)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ accessToken })
  })
})
