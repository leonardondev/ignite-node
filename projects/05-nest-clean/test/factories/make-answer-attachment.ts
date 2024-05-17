import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const props = {
    answerId: new UniqueEntityID(),
    attachmentId: new UniqueEntityID(),
    ...override,
  }

  const answerAttachment = AnswerAttachment.create(props, id)

  return answerAttachment
}

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(
    override: Partial<AnswerAttachmentProps> = {},
    id?: UniqueEntityID,
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachment(override, id)

    await this.prisma.attachment.update({
      where: {
        id: answerAttachment.attachmentId.toString(),
      },
      data: {
        answerId: answerAttachment.answerId.toString(),
      },
    })

    return answerAttachment
  }
}
