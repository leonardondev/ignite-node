import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  findBySlug(slug: string) {
    return new Promise<Question | null>((resolve) => {
      resolve(
        this.items.find((question) => question.slug.value === slug) ?? null,
      )
    })
  }

  create(question: Question): Promise<Question> {
    return new Promise<Question>((resolve) => {
      this.items.push(question)
      resolve(question)
    })
  }
}
