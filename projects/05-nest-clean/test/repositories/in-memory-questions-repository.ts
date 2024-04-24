import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find(
      (question) => question.id.toString() === id,
    )

    return Promise.resolve(question ?? null)
  }

  async findBySlug(slug: string) {
    const question = this.items.find((question) => question.slug.value === slug)

    return Promise.resolve(question ?? null)
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return Promise.resolve(questions)
  }

  async create(question: Question): Promise<Question> {
    this.items.push(question)

    DomainEvents.dispatchEventsForAggregate(question.id)

    return Promise.resolve(question)
  }

  async save(question: Question): Promise<Question> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items[itemIndex] = question

    DomainEvents.dispatchEventsForAggregate(question.id)

    return Promise.resolve(question)
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(itemIndex, 1)

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )

    return Promise.resolve()
  }
}
