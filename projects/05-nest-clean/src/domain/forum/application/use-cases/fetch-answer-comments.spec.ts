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

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
    expect(result.value?.answerComments).toEqual([
      expect.objectContaining({ answerId }),
      expect.objectContaining({ answerId }),
      expect.objectContaining({ answerId }),
    ])
  })
})
