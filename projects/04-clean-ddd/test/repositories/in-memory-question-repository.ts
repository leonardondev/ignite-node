import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  create(question: Question): Promise<Question> {
    return new Promise<Question>((resolve) => {
      this.items.push(question)
      resolve(question)
    })
  }
}
