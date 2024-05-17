import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (questionAttachment) =>
        questionAttachment.questionId.toString() === questionId,
    )

    return Promise.resolve(questionAttachments)
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.items.push(...attachments)

    return Promise.resolve()
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.items.filter(
      (item) => !attachments.some((attachment) => attachment.equals(item)),
    )

    this.items = questionAttachments

    return Promise.resolve()
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachments = this.items.filter(
      (questionAttachment) =>
        questionAttachment.questionId.toString() !== questionId,
    )

    this.items = questionAttachments

    return Promise.resolve()
  }
}
