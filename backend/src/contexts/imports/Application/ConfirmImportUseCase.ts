import { ImportsRepository } from '../Domain/Repositories/ImportsRepository'
import LeadRepository from '../Domain/Repositories/LeadRepository'

export default class ComfirmImportUseCase {
  constructor(
    private importsRepository: ImportsRepository,
    private leadsRepository: LeadRepository
  ) {}

  async execute({ id }: { id: string }): Promise<void> {
    const imported = await this.importsRepository.get(id)

    await Promise.all(
      imported.data.map(async (l) => {
        if (l.isValid) {
          await this.leadsRepository.create(l)
        }
      })
    )
  }
}
