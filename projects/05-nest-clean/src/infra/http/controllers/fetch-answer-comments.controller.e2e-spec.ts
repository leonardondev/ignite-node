import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { AnswerCommentFactory } from 'test/factories/make-answer-comment'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch answer comments (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let answerCommentFactory: AnswerCommentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AnswerFactory,
        AnswerCommentFactory,
      ],
    }).compile()

    jwt = moduleRef.get(JwtService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerCommentFactory = moduleRef.get(AnswerCommentFactory)

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[GET] /answers/:answerId/comments', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })

    await Promise.all([
      await answerCommentFactory.makePrismaAnswerComment({
        answerId: answer.id,
        authorId: user.id,
        content: 'Answer Comment 01',
      }),
      await answerCommentFactory.makePrismaAnswerComment({
        answerId: answer.id,
        authorId: user.id,
        content: 'Answer Comment 02',
      }),
      await answerCommentFactory.makePrismaAnswerComment({
        answerId: answer.id,
        authorId: user.id,
        content: 'Answer Comment 03',
      }),
    ])

    const answerId = answer.id.toString()

    const response = await request(app.getHttpServer())
      .get(`/answers/${answerId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({
          content: 'Answer Comment 01',
          authorName: 'John Doe',
        }),
        expect.objectContaining({
          content: 'Answer Comment 02',
          authorName: 'John Doe',
        }),
        expect.objectContaining({
          content: 'Answer Comment 03',
          authorName: 'John Doe',
        }),
      ]),
    })
  })
})
