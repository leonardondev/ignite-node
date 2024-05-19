import { makeAttachment } from 'test/factories/make-attachment'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)

    const question = makeQuestion({
      slug: Slug.create('example-question'),
      authorId: student.id,
    })
    await inMemoryQuestionsRepository.create(question)

    const attachment1 = makeAttachment({ title: 'Some attachment' })
    const attachment2 = makeAttachment({ title: 'Another attachment' })
    inMemoryAttachmentsRepository.items.push(attachment1, attachment2)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: question.id,
        attachmentId: attachment1.id,
      }),
      makeQuestionAttachment({
        questionId: question.id,
        attachmentId: attachment2.id,
      }),
    )

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: question.title,
        author: expect.objectContaining({
          name: 'John Doe',
        }),
        attachments: expect.arrayContaining([
          expect.objectContaining({ title: 'Some attachment' }),
          expect.objectContaining({ title: 'Another attachment' }),
        ]),
      }),
    })
  })
})
