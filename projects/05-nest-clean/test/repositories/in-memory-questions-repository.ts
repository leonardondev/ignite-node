import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

import { InMemoryAttachmentsRepository } from './in-memory-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachments-repository'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private studentRepository: InMemoryStudentsRepository,
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

  async findDetailsBySlug(slug: string) {
    const question = this.items.find((question) => question.slug.value === slug)

    if (!question) {
      return Promise.resolve(null)
    }

    const author = this.studentRepository.items.find((student) => {
      return student.id.equals(question.authorId)
    })

    if (!author) {
      throw new Error(
        `Author with ID ${question.authorId.toString()} does not exist.`,
      )
    }

    const questionAttachments = this.questionAttachmentsRepository.items.filter(
      (questionAttachment) => {
        return questionAttachment.questionId.equals(question.id)
      },
    )

    const attachments = questionAttachments.map((questionAttachment) => {
      const attachment = this.attachmentsRepository.items.find((attachment) => {
        return attachment.id.equals(questionAttachment.attachmentId)
      })

      if (!attachment) {
        throw new Error(
          `Attachment with ID ${questionAttachment.attachmentId.toString()} does not exist.`,
        )
      }

      return attachment
    })

    const questionDetails = QuestionDetails.create({
      questionId: question.id,
      title: question.title,
      content: question.content,
      slug: Slug.create(question.slug.value),
      author: {
        id: author.id,
        name: author.name,
      },
      attachments,
      bestAnswerId: question.bestAnswerId,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    })

    return Promise.resolve(questionDetails)
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return Promise.resolve(questions)
  }

  async create(question: Question): Promise<Question> {
    this.items.push(question)

    this.questionAttachmentsRepository.createMany(
      question.attachments.getItems(), // current watched list items
    )

    DomainEvents.dispatchEventsForAggregate(question.id)

    return Promise.resolve(question)
  }

  async save(question: Question): Promise<Question> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items[itemIndex] = question

    this.questionAttachmentsRepository.createMany(
      question.attachments.getNewItems(), // new watched list items
    )

    this.questionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems(), // old watched list items
    )

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
