import { PaginationParams } from '@/core/repositories/pagination-params'
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

  findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return Promise.resolve(questions)
  }

  create(question: Question): Promise<Question> {
    return new Promise<Question>((resolve) => {
      this.items.push(question)
      resolve(question)
    })
  }

  save(question: Question): Promise<Question> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    return new Promise<Question>((resolve) => {
      this.items[itemIndex] = question
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
