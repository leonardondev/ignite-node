import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    const questionId = new UniqueEntityID('question-1')

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
    expect(result.value?.questionComments).toEqual([
      expect.objectContaining({ questionId }),
      expect.objectContaining({ questionId }),
      expect.objectContaining({ questionId }),
    ])
  })
})
