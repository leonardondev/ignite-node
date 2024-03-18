import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'

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
