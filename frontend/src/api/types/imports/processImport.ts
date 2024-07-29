export type ProcessImportInput = FormData

export type ProcessImportOutput = {
  id: number
  leads: {
    isValid: boolean
    leads: {
      id: string
      firstName: string
      lastName?: string
      email?: string
      jobTitle?: string
      countryCode?: string
      companyName?: string
      yearsInRole?: number
      phoneNumber?: string
      isValid: boolean
    }[]
  }[]
}
