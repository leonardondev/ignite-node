import { AnswerWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/answer-with-author'

export class AnswerWithAuthorPresenter {
  static toHTTP(answerWithAuthor: AnswerWithAuthor) {
    return {
      answerId: answerWithAuthor.answerId.toValue(),
      content: answerWithAuthor.content,
      authorId: answerWithAuthor.author.id.toValue(),
      authorName: answerWithAuthor.author.name,
      createdAt: answerWithAuthor.createdAt,
      updatedAt: answerWithAuthor.updatedAt,
    }
  }
}
