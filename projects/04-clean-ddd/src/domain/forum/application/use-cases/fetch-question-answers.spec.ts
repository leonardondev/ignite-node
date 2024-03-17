import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const questionId = new UniqueEntityID('question-1')

    await inMemoryAnswersRepository.create(makeAnswer({ questionId }))
    await inMemoryAnswersRepository.create(makeAnswer({ questionId }))
    await inMemoryAnswersRepository.create(makeAnswer({ questionId }))

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
    expect(result.value?.answers).toEqual([
      expect.objectContaining({ questionId }),
      expect.objectContaining({ questionId }),
      expect.objectContaining({ questionId }),
    ])
  })

  it('should be able to fetch paginated question answers', async () => {
    const questionId = new UniqueEntityID('question-1')

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({ questionId }))
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
