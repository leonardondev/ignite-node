import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  findById(id: string): Promise<QuestionComment | null> {
    return new Promise<QuestionComment | null>((resolve) => {
      resolve(
        this.items.find(
          (questionComment) => questionComment.id.toString() === id,
        ) ?? null,
      )
    })
  }

  findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter(
        (questionComment) =>
          questionComment.questionId.toString() === questionId,
      )
      .slice((page - 1) * 20, page * 20)

    return Promise.resolve(questionComments)
  }

  create(questionComment: QuestionComment): Promise<QuestionComment> {
    return new Promise<QuestionComment>((resolve) => {
      this.items.push(questionComment)
      resolve(questionComment)
    })
  }

  delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    return new Promise<void>((resolve) => {
      this.items.splice(itemIndex, 1)
      resolve()
    })
  }
}
