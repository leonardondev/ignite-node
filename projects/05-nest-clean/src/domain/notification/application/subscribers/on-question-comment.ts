import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { QuestionCommentEvent } from '@/domain/forum/enterprise/events/question-comment-event'
import { SendNotificationUseCase } from '../use-case/send-notification'

export class OnQuestionComment implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionCommentNotification.bind(this),
      QuestionCommentEvent.name,
    )
  }

  private async sendQuestionCommentNotification({
    questionComment,
  }: QuestionCommentEvent) {
    const question = await this.questionsRepository.findById(
      questionComment.questionId.toValue(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Sua pergunta foi comentada.`,
        content: `Novo comentário em "${question.title
          .substring(0, 20)
          .concat('...')}"`,
      })
    }
  }
}
