import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'
import { DateService } from '../services/date-service'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) =>
    new Promise((resolve) => resolve(question)),
}

const fakeDateService: DateService = {
  diffInDays(refDate, targetDate) {
    console.log({ refDate, targetDate })
    return 2
  },
}

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(
    fakeQuestionsRepository,
    fakeDateService,
  )

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'question title 1',
    content: 'New question content',
  })

  expect(question.authorId).toBeTruthy()
  expect(question.content).toEqual('New question content')
})
