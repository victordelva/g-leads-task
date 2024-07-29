import { Lead } from '../../../types/Lead.ts'

export type LeadsUpdateSomeInput = {
  id: number
  gender?: string
  message?: string
  companyName?: string
  countryCode?: string
  jobTitle?: string
  email?: string
  firstName?: string
  lastName?: string
}

export type LeadsUpdateSomeOutput = Lead
