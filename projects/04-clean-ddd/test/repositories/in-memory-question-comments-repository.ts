import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  create(questionComment: QuestionComment): Promise<QuestionComment> {
    return new Promise<QuestionComment>((resolve) => {
      this.items.push(questionComment)
      resolve(questionComment)
    })
  }
}
