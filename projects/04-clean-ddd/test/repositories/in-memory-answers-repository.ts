import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  create(answer: Answer): Promise<Answer> {
    return new Promise<Answer>((resolve) => {
      this.items.push(answer)
      resolve(answer)
    })
  }
}
