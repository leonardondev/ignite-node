import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerCommentEvent } from '@/domain/forum/enterprise/events/answer-comment-event'
import { SendNotificationUseCase } from '../use-case/send-notification'

export class OnAnswerComment implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendAnswerCommentNotification.bind(this),
      AnswerCommentEvent.name,
    )
  }

  private async sendAnswerCommentNotification({
    answerComment,
  }: AnswerCommentEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toValue(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi comentada.`,
        content: `Novo comentário em "${answer.content
          .substring(0, 20)
          .concat('...')}"`,
      })
    }
  }
}
