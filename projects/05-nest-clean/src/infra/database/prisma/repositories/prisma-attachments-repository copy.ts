import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachments-mapper'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<Attachment> {
    const data = PrismaAttachmentMapper.toPersistent(attachment)

    const createdAttachment = await this.prisma.attachment.create({
      data,
    })

    return PrismaAttachmentMapper.toDomain(createdAttachment)
  }
}
