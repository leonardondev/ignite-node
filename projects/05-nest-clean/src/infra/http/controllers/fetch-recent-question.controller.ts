import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { JwtGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { QuestionPresenter } from '../presenters/question-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(JwtGuard)
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestion: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const result = await this.fetchRecentQuestion.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { questions } = result.value

    return {
      questions: questions.map(QuestionPresenter.toHTTP),
    }
  }
}
