import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const props = {
    questionId: new UniqueEntityID(),
    attachmentId: new UniqueEntityID(),
    ...override,
  }

  const questionAttachment = QuestionAttachment.create(props, id)

  return questionAttachment
}

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(
    override: Partial<QuestionAttachmentProps> = {},
    id?: UniqueEntityID,
  ): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttachment(override, id)

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString(),
      },
      data: {
        questionId: questionAttachment.questionId.toString(),
      },
    })

    return questionAttachment
  }
}
