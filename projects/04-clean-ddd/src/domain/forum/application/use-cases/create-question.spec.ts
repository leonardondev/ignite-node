import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DayJsDateService } from 'test/services/dayjs-date-service'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let dateService: DayJsDateService
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    dateService = new DayJsDateService()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository, dateService)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'question title 1',
      content: 'New question content',
      attachmentIds: ['1', '2'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
