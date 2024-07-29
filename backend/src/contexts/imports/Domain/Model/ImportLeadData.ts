import Import from './Import'

export class ImportLeadData {
  firstName: string
  lastName?: string
  email?: string
  jobTitle?: string
  countryCode?: string
  companyName?: string
  yearsInRole?: number
  phoneNumber?: string
  isValid: boolean

  constructor({
    firstName,
    lastName,
    email,
    jobTitle,
    countryCode,
    companyName,
    yearsInRole,
    phoneNumber,
    isValid,
  }: {
    firstName: string
    lastName?: string
    email?: string
    jobTitle?: string
    countryCode?: string
    companyName?: string
    yearsInRole?: number
    phoneNumber?: string
    isValid: boolean
  }) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.jobTitle = jobTitle
    this.countryCode = countryCode
    this.companyName = companyName
    this.yearsInRole = yearsInRole
    this.phoneNumber = phoneNumber
    this.isValid = isValid
  }

  static fromObject(data: any) {
    return new ImportLeadData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      jobTitle: data.jobTitle,
      countryCode: data.countryCode,
      companyName: data.companyName,
      yearsInRole: data.yearsInRole,
      phoneNumber: data.phoneNumber,
      isValid: data.isValid,
    })
  }

  toObject() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      jobTitle: this.jobTitle,
      countryCode: this.countryCode,
      companyName: this.companyName,
      yearsInRole: this.yearsInRole,
      phoneNumber: this.phoneNumber,
      isValid: this.isValid,
    }
  }
}
