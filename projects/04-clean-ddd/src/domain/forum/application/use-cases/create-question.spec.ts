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
    const { question } = await sut.execute({
      authorId: '1',
      title: 'question title 1',
      content: 'New question content',
    })

    expect(question.authorId).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
