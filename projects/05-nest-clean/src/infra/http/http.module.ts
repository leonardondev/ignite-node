import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller'
import { FetchRecentQuestionsController } from '@/infra/http/controllers/fetch-recent-question.controller'
import { DayJsDateService } from '@/infra/services/dayjs-date-service'

import { DateService } from '@/domain/forum/application/services/date-service'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    { provide: DateService, useClass: DayJsDateService },
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
  ],
})
export class HttpModule {}
