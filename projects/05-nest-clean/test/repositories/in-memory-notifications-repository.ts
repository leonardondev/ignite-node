import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find(
      (notification) => notification.id.toString() === id,
    )

    return Promise.resolve(notification ?? null)
  }

  async create(notification: Notification): Promise<Notification> {
    this.items.push(notification)

    return Promise.resolve(notification)
  }

  async save(notification: Notification): Promise<Notification> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )
    this.items[itemIndex] = notification

    return Promise.resolve(notification)
  }
}
