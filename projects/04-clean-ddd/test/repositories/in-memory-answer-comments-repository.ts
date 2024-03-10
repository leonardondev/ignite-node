import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  create(answerComment: AnswerComment): Promise<AnswerComment> {
    return new Promise<AnswerComment>((resolve) => {
      this.items.push(answerComment)
      resolve(answerComment)
    })
  }
}
