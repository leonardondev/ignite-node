import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>
  create(answer: Answer): Promise<Answer>
  save(answer: Answer): Promise<Answer>
  delete(answer: Answer): Promise<void>
}
