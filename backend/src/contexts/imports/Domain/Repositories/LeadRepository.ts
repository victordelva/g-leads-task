import { LeadCsvImport } from '../../Application/ProcessLeadsCsvUseCase'

export default interface LeadRepository {
  create(data: LeadCsvImport): Promise<void>
}
