import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  findById(id: string): Promise<Question | null> {
    return new Promise<Question | null>((resolve) => {
      resolve(
        this.items.find((question) => question.id.toString() === id) ?? null,
      )
    })
  }

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

  delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    return new Promise<void>((resolve) => {
      this.items.splice(itemIndex, 1)
      resolve()
    })
  }
}
