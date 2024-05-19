import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toValue(),
      title: questionDetails.title,
      content: questionDetails.content,
      slug: questionDetails.slug.value,
      authorId: questionDetails.author.id.toValue(),
      bestAnswerId: questionDetails.bestAnswerId?.toValue(),
      authorName: questionDetails.author.name,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
