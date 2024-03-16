import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  findById(id: string): Promise<AnswerComment | null> {
    return new Promise<AnswerComment | null>((resolve) => {
      resolve(
        this.items.find(
          (answerComment) => answerComment.id.toString() === id,
        ) ?? null,
      )
    })
  }

  create(answerComment: AnswerComment): Promise<AnswerComment> {
    return new Promise<AnswerComment>((resolve) => {
      this.items.push(answerComment)
      resolve(answerComment)
    })
  }

  delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    return new Promise<void>((resolve) => {
      this.items.splice(itemIndex, 1)
      resolve()
    })
  }
}
