import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { PrismaQuestionMapper } from '@/infra/database/prisma/mappers/prisma-question-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DayJsDateService } from '@/infra/services/dayjs-date-service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const fakeTitle = faker.lorem.sentence()

  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: fakeTitle,
      slug: Slug.createFromText(fakeTitle),
      content: faker.lorem.text(),
      dateService: new DayJsDateService(),
      ...override,
    },
    id,
  )

  return question
}

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(
    override: Partial<QuestionProps> = {},
    id?: UniqueEntityID,
  ): Promise<Question> {
    const question = makeQuestion(override, id)

    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPersistent(question),
    })

    return question
  }
}
