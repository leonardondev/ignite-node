import { DomainEvents } from '@/core/events/domain-events'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.items.find((student) => student.email === email)

    return Promise.resolve(student ?? null)
  }

  async create(student: Student): Promise<Student> {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)

    return Promise.resolve(student)
  }
}
