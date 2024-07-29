import { LeadRepository } from '../Domain/Repositories/LeadRepository'
import { Lead } from '../Domain/Model/Lead'

export class UpdateLeadUseCase {
  constructor(private readonly leadRepository: LeadRepository) {}

  async execute({
    id,
    message,
    gender,
    companyName,
    countryCode,
    jobTitle,
    email,
    firstName,
    lastName,
  }: {
    id: string
    message?: string
    gender?: string
    companyName?: string
    countryCode?: string
    jobTitle?: string
    email?: string
    firstName?: string
    lastName?: string
  }): Promise<Lead> {
    return await this.leadRepository.patch({
      id,
      message,
      gender,
      companyName,
      countryCode,
      jobTitle,
      email,
      firstName,
      lastName,
    })
  }
}
