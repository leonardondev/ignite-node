import { Answer } from '@/domain/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<Answer>
}
