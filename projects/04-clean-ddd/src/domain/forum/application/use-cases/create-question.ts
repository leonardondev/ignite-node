import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { DateService } from '@/domain/forum/application/services/date-service'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private dateService: DateService,
  ) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
      dateService: this.dateService,
    })

    await this.questionRepository.create(question)

    return { question }
  }
}
