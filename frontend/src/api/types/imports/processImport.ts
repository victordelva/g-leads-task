import { Lead } from '../../../types/Lead.ts'

export type ProcessImportInput = FormData

export type ProcessImportOutput = {
  id: number
  leads: Lead[]
}
