import { EventInterface } from './Event'

export interface EventBus {
  publish(event: EventInterface): Promise<void>
  subscribe(eventClass: any, handler: (event: EventInterface) => Promise<void>): void
}
