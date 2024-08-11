import { DomainEvent } from '../Events/DomainEvent'

export abstract class AggregatedRoot {
  public events: DomainEvent[] = [] // TODO: add Event interface

  public addEvent(event: any): void {
    this.events.push(event)
  }

  public pullEvents(): DomainEvent[] {
    const events = this.events
    this.events = []
    return events
  }
}
