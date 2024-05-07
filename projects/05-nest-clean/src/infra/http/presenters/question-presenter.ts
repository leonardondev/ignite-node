import { Question } from '@/domain/forum/enterprise/entities/question'

export class QuestionPresenter {
  static toHTTP(question: Question) {
    return {
      id: question.id.toValue(),
      title: question.title,
      slug: question.slug.value,
      authorId: question.authorId.toValue(),
      bestAnswerId: question.bestAnswerId?.toValue(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
