import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '@/domain/repositories/answers-repository'
import { Answer } from '@/domain/entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => new Promise((resolve) => resolve(answer)),
}

test('create a answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: 'instructor-1',
    questionId: 'question-1',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
