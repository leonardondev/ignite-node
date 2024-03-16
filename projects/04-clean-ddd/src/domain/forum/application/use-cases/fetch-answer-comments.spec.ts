import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const answerId = new UniqueEntityID('answer-1')

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId }),
    )

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
    expect(answerComments).toEqual([
      expect.objectContaining({ answerId }),
      expect.objectContaining({ answerId }),
      expect.objectContaining({ answerId }),
    ])
  })

  // it.skip('should be able to fetch paginated answer comments', async () => {
  //   const answerId = new UniqueEntityID('answer-1')

  //   for (let i = 1; i <= 22; i++) {
  //     await inMemoryCommentsRepository.create(makeComment({ answerId }))
  //   }

  //   const { comments } = await sut.execute({
  //     answerId: 'answer-1',
  //     page: 2,
  //   })

  //   expect(comments).toHaveLength(2)
  // })
})
