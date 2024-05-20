import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    })

    if (!notification) {
      return null
    }

    return PrismaNotificationMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<Notification> {
    const data = PrismaNotificationMapper.toPersistent(notification)

    const createdNotification = await this.prisma.notification.create({
      data,
    })

    return PrismaNotificationMapper.toDomain(createdNotification)
  }

  async save(notification: Notification): Promise<Notification> {
    const data = PrismaNotificationMapper.toPersistent(notification)

    const updatedNotification = await this.prisma.notification.update({
      where: { id: data.id },
      data,
    })

    return PrismaNotificationMapper.toDomain(updatedNotification)
  }
}
