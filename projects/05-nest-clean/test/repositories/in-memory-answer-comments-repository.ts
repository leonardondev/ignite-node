import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  constructor(private studentsRepository: InMemoryStudentsRepository) {}

  async findById(id: string) {
    const answer = this.items.find(
      (answerComment) => answerComment.id.toString() === id,
    )

    return Promise.resolve(answer ?? null)
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((answerComment) => answerComment.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return Promise.resolve(answerComments)
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ) {
    const answerComments = this.items
      .filter((answerComment) => answerComment.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.items.find((student) =>
          student.id.equals(comment.authorId),
        )

        if (!author) {
          throw new Error(
            `Author with ID ${comment.authorId.toString()} does not exist.`,
          )
        }

        return CommentWithAuthor.create({
          content: comment.content,
          commentId: comment.id,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          author: {
            id: author.id,
            name: author.name,
          },
        })
      })

    return Promise.resolve(answerComments)
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)

    DomainEvents.dispatchEventsForAggregate(answerComment.id)

    return Promise.resolve(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )
    this.items.splice(itemIndex, 1)

    return Promise.resolve()
  }
}
