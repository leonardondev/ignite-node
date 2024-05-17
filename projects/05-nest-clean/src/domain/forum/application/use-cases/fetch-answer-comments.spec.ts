import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const newStudent = makeStudent({ name: 'John Doe' })
    const student = await inMemoryStudentsRepository.create(newStudent)

    const answerId = new UniqueEntityID('answer-1')

    const comment1 = await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId, authorId: student.id }),
    )
    const comment2 = await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId, authorId: student.id }),
    )
    const comment3 = await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId, authorId: student.id }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: expect.objectContaining({ name: 'John Doe' }),
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: expect.objectContaining({ name: 'John Doe' }),
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: expect.objectContaining({ name: 'John Doe' }),
          commentId: comment3.id,
        }),
      ]),
    )
  })

  it('should be able to fetch paginated answer comments', async () => {
    const newStudent = makeStudent({ name: 'John Doe' })
    const student = await inMemoryStudentsRepository.create(newStudent)

    const answerId = new UniqueEntityID('answer-1')

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId,
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
