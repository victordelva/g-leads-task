import { Lead } from '../Domain/Model/Lead'
import { LeadRepository } from '../Domain/Repositories/LeadRepository'

export default class CreateLeadUseCase {
  constructor(private leadsRepository: LeadRepository) {}

  async execute(data: {
    firstName: string
    lastName?: string
    email?: string
    jobTitle?: string
    countryCode?: string
    companyName?: string
    yearsInRole?: number
    phoneNumber?: string
  }): Promise<void> {
    const lead = Lead.create(data)
    return this.leadsRepository.save(lead)
  }
}
