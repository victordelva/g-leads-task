import { Lead } from '../Model/Lead'

export interface LeadRepository {
  get(id: string): Promise<Lead>
  delete(id: string): Promise<void>
  patch(data: {
    id: string
    message?: string
    gender?: string
    companyName?: string
    countryCode?: string
    jobTitle?: string
    email?: string
    firstName?: string
    lastName?: string
  }): Promise<Lead>
  save(lead: Lead): Promise<void>
}
