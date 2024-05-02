import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { DayJsDateService } from '@/infra/services/dayjs-date-service'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      slug: Slug.create('example-question'),
      content: faker.lorem.text(),
      dateService: new DayJsDateService(),
      ...override,
    },
    id,
  )

  return question
}
