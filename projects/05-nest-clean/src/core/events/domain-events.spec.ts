import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

/* Event */
class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate //eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

/* Entity */
class CustomAggregate extends AggregateRoot<unknown> {
  static create() {
    const aggregate = new CustomAggregate(null)

    /* PUB */
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    /* SUB */
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    /* Estou criando a entidade sem persistir */
    const aggregate = CustomAggregate.create()

    /* Estou assegurando que o evento foi criado, mas não disparado */
    expect(aggregate.domainEvents).toHaveLength(1)

    /* Persistindo os dados e assim disparando o evento */
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    /* o Subscriber ouve e faz o que precisa ser feito com o dado */
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
