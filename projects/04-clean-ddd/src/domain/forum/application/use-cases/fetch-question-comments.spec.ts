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

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(3)
    expect(questionComments).toEqual([
      expect.objectContaining({ questionId }),
      expect.objectContaining({ questionId }),
      expect.objectContaining({ questionId }),
    ])
  })

  // it.skip('should be able to fetch paginated question comments', async () => {
  //   const questionId = new UniqueEntityID('question-1')

  //   for (let i = 1; i <= 22; i++) {
  //     await inMemoryCommentsRepository.create(makeComment({ questionId }))
  //   }

  //   const { comments } = await sut.execute({
  //     questionId: 'question-1',
  //     page: 2,
  //   })

  //   expect(comments).toHaveLength(2)
  // })
})
