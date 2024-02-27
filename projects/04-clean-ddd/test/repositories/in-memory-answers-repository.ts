import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  findById(id: string): Promise<Answer | null> {
    return new Promise<Answer | null>((resolve) => {
      resolve(this.items.find((answer) => answer.id.toString() === id) ?? null)
    })
  }

  create(answer: Answer): Promise<Answer> {
    return new Promise<Answer>((resolve) => {
      this.items.push(answer)
      resolve(answer)
    })
  }

  delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    return new Promise<void>((resolve) => {
      this.items.splice(itemIndex, 1)
      resolve()
    })
  }
}
