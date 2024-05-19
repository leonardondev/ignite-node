import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch question answers (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    jwt = moduleRef.get(JwtService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[GET] /questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    await Promise.all([
      await answerFactory.makePrismaAnswer({
        questionId: question.id,
        authorId: user.id,
        content: 'Answer 01',
      }),
      await answerFactory.makePrismaAnswer({
        questionId: question.id,
        authorId: user.id,
        content: 'Answer 02',
      }),
      await answerFactory.makePrismaAnswer({
        questionId: question.id,
        authorId: user.id,
        content: 'Answer 03',
      }),
    ])

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      answers: expect.arrayContaining([
        expect.objectContaining({
          content: 'Answer 01',
          authorName: 'John Doe',
        }),
        expect.objectContaining({
          content: 'Answer 02',
          authorName: 'John Doe',
        }),
        expect.objectContaining({
          content: 'Answer 03',
          authorName: 'John Doe',
        }),
      ]),
    })
  })
})
