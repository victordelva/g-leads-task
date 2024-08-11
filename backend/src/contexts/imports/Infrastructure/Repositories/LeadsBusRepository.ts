import LeadRepository from '../../Domain/Repositories/LeadRepository'
import CreateLeadUseCase from '../../../leads/Application/CreateLeadUseCase'
import { ImportLeadData } from '../../Domain/Model/ImportLeadData'

export default class LeadsBusRepository implements LeadRepository {
  // Simplified implementation of the bus to make it work.
  // We would use EventBus from Shared context for publishing event
  constructor(private createLeadUseCase: CreateLeadUseCase) {}

  async create(data: ImportLeadData): Promise<void> {
    // for complex cases we would dispatch a CommandInterface that execute this use case and an Event.
    await this.createLeadUseCase.execute({
      ...data.toObject(),
    })
  }
}
