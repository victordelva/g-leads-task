import { Gender } from './Gender'

export class Lead {
  id: number
  firstName: string
  lastName?: string
  countryCode?: string
  email?: string
  gender?: Gender
  message?: string

  constructor({
    id,
    firstName,
    lastName,
    countryCode,
    email,
    gender,
    message,
  }: {
    id: number
    firstName: string
    lastName?: string
    countryCode?: string
    email?: string
    gender?: Gender
    message?: string
  }) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.countryCode = countryCode
    this.email = email
    this.gender = gender
    this.message = message
  }

  static fromPrisma(data: {
    id: number
    firstName: string
    lastName?: string | null
    countryCode?: string | null
    email?: string | null
    gender?: string | null
    message?: string | null
  }) {
    return new Lead({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName ?? undefined,
      countryCode: data.countryCode ?? undefined,
      email: data.email ?? undefined,
      gender: (data.gender as Gender) ?? undefined,
      message: data.message ?? undefined,
    })
  }
}
