import { Gender } from './Gender'
import { AggregatedRoot } from '../../../shared/Domain/Model/AggregatedRoot'
import LeadCreated from '../Events/LeadCreated'

export class Lead extends AggregatedRoot {
  id?: number
  firstName: string
  lastName?: string
  companyName?: string
  countryCode?: string
  email?: string
  jobTitle?: string
  gender?: Gender
  message?: string

  constructor({
    id,
    firstName,
    lastName,
    countryCode,
    companyName,
    jobTitle,
    email,
    gender,
    message,
  }: {
    id?: number
    firstName: string
    lastName?: string
    countryCode?: string
    companyName?: string
    jobTitle?: string
    email?: string
    gender?: Gender
    message?: string
  }) {
    super()
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.countryCode = countryCode
    this.jobTitle = jobTitle
    this.companyName = companyName
    this.email = email
    this.gender = gender
    this.message = message
  }

  static create(data: {
    firstName: string
    lastName?: string
    email?: string
    jobTitle?: string
    countryCode?: string
    companyName?: string
    yearsInRole?: number
    phoneNumber?: string
  }) {
    // We could add domain events here, for side effects after creating a lead
    const lead = new Lead({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      jobTitle: data.jobTitle,
      countryCode: data.countryCode,
      companyName: data.companyName,
    })

    lead.addEvent(new LeadCreated())

    return lead
  }

  static fromPrisma(data: {
    id: number
    firstName: string
    lastName?: string | null
    companyName?: string | null
    jobTitle?: string | null
    countryCode?: string | null
    email?: string | null
    gender?: string | null
    message?: string | null
  }) {
    return new Lead({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName ?? undefined,
      companyName: data.companyName ?? undefined,
      jobTitle: data.jobTitle ?? undefined,
      countryCode: data.countryCode ?? undefined,
      email: data.email ?? undefined,
      gender: (data.gender as Gender) ?? undefined,
      message: data.message ?? undefined,
    })
  }

  toObject() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      companyName: this.companyName,
      countryCode: this.countryCode,
      email: this.email,
      jobTitle: this.jobTitle,
    }
  }
}
