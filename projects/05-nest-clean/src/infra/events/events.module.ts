import { OnAnswerComment } from '@/domain/notification/application/subscribers/on-answer-comment'
import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { OnQuestionComment } from '@/domain/notification/application/subscribers/on-question-comment'
import { SendNotificationUseCase } from '@/domain/notification/application/use-case/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    OnQuestionComment,
    OnAnswerComment,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
