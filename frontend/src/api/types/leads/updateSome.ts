import { Lead } from '../../../types/Lead.ts'

export type LeadsUpdateSomeInput = {
  id: number
  gender?: string
  message?: string
}

export type LeadsUpdateSomeOutput = Lead
