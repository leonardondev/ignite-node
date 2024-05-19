import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/answer-with-author'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
    private studentsRepository: InMemoryStudentsRepository,
  ) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((answer) => answer.id.toString() === id)

    return Promise.resolve(answer ?? null)
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return Promise.resolve(answers)
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<AnswerWithAuthor[]> {
    const answers = this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      .map((answer) => {
        const author = this.studentsRepository.items.find((student) =>
          student.id.equals(answer.authorId),
        )

        if (!author) {
          throw new Error(
            `Author with ID ${answer.authorId.toString()} does not exist.`,
          )
        }

        return AnswerWithAuthor.create({
          questionId: answer.questionId,
          answerId: answer.id,
          content: answer.content,
          createdAt: answer.createdAt,
          updatedAt: answer.updatedAt,
          author: {
            id: author.id,
            name: author.name,
          },
        })
      })

    return Promise.resolve(answers)
  }

  async create(answer: Answer): Promise<Answer> {
    this.items.push(answer)

    this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems(), // current watched list items
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)

    return Promise.resolve(answer)
  }

  async save(answer: Answer): Promise<Answer> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[itemIndex] = answer

    this.answerAttachmentsRepository.createMany(
      answer.attachments.getNewItems(), // new watched list items
    )

    this.answerAttachmentsRepository.deleteMany(
      answer.attachments.getRemovedItems(), // old watched list items
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)

    return Promise.resolve(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())

    return Promise.resolve()
  }
}
