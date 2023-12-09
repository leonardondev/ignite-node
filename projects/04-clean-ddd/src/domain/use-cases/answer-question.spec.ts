import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create a answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    instructorId: 'instructor-1',
    questionId: 'question-1',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
