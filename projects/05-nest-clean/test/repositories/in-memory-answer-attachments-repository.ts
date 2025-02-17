import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (answerAttachment) => answerAttachment.answerId.toString() === answerId,
    )

    return Promise.resolve(answerAttachments)
  }

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.items.push(...attachments)

    return Promise.resolve()
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const answerAttachments = this.items.filter(
      (item) => !attachments.some((attachment) => attachment.equals(item)),
    )

    this.items = answerAttachments

    return Promise.resolve()
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachments = this.items.filter(
      (answerAttachment) => answerAttachment.answerId.toString() !== answerId,
    )

    this.items = answerAttachments

    return Promise.resolve()
  }
}
