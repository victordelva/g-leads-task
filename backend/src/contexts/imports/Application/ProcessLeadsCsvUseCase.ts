import { ImportsRepository } from '../Domain/Repositories/ImportsRepository'
import CSVParserService from '../Infrastructure/Services/CSVParserService'
import { ImportLeadData } from '../Domain/Model/ImportLeadData'

export type LeadCsvImport = {
  firstName: string
  lastName?: string
  email?: string
  jobTitle?: string
  countryCode?: string
  companyName?: string
  yearsInRole?: number
  phoneNumber?: string
}

export default class ProcessLeadsCsvUseCase {
  constructor(
    private importsRepository: ImportsRepository,
    private csvParserService: CSVParserService
  ) {}

  private isValidLead(lead: any): boolean {
    if (typeof lead.firstName !== 'string' || !lead.firstName.length) return false
    if (lead.lastName && typeof lead.lastName !== 'string') return false
    if (lead.email && typeof lead.email !== 'string') return false
    if (lead.jobTitle && typeof lead.jobTitle !== 'string') return false
    if (lead.countryCode && typeof lead.countryCode !== 'string') return false
    if (lead.companyName && typeof lead.companyName !== 'string') return false
    if (lead.yearsInRole && lead.yearsInRole.length && typeof lead.yearsInRole !== 'number') return false
    if (lead.phoneNumber && lead.phoneNumber.length && typeof lead.phoneNumber !== 'string') return false
    return true
  }

  private filterDuplicates(leads: ImportLeadData[]): ImportLeadData[] {
    // Guessing that duplicated leads in database are allowed.
    const uniqueLeads = new Map<string, ImportLeadData>()
    leads.forEach((lead) => {
      const key = `${lead.firstName.toLowerCase().trim()}-${lead.lastName?.toLowerCase().trim()}`
      if (!uniqueLeads.has(key)) {
        uniqueLeads.set(key, lead)
      }
    })
    return Array.from(uniqueLeads.values())
  }

  async execute({ data }: { data: string }): Promise<{
    id: number
    leads: ImportLeadData[]
  }> {
    let parsed = this.csvParserService.parseCsvData(data) as LeadCsvImport[]

    const parsedData = parsed.map((lead, index) => {
      return new ImportLeadData({
        ...lead,
        countryCode: String(lead.countryCode),
        phoneNumber: String(lead.phoneNumber),
        jobTitle: String(lead.jobTitle),
        isValid: this.isValidLead(lead),
      })
    })

    const uniqueLeads = this.filterDuplicates(parsedData) as ImportLeadData[]
    const imported = await this.importsRepository.create(uniqueLeads)

    return {
      id: imported.id,
      leads: uniqueLeads,
    }
  }
}
