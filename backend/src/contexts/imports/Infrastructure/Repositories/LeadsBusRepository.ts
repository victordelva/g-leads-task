import LeadRepository from '../../Domain/Repositories/LeadRepository'
import CreateLeadUseCase from '../../../leads/Application/CreateLeadUseCase'
import { ImportLeadData } from '../../Domain/Model/ImportLeadData'

export default class LeadsBusRepository implements LeadRepository {
  // this is obviously too simple for this separation, but it's just an example
  // Would we separate the context for leads and imports?
  constructor(private createLeadUseCase: CreateLeadUseCase) {}

  async create(data: ImportLeadData): Promise<void> {
    await this.createLeadUseCase.execute({
      ...data.toObject(),
    })
  }
}
