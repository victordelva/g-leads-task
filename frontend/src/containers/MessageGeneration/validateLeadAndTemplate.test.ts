import { Lead } from '../../types/Lead'
import { validateLeadsFields } from './validateLeadAndTemplate'

describe('validateLeadsFields', () => {
  test('correct lead template', () => {
    const lead = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      countryCode: 'US',
      email: 'email@example.com',
    } as Lead
    const template = 'Hello {firstName} {lastName}'
    const validation = validateLeadsFields([lead], template)

    expect(validation.areAllValid).toBe(true)
    expect(validation.leads.length).toBe(1)
    expect(validation.leads[0].isValid).toBe(true)
    expect(validation.leads[0].invalidFields.length).toBe(0)
  })

  test('incorrect lead template', () => {
    const lead = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      countryCode: 'US',
    } as Lead
    const template = 'Hello {firstName} {lastName} {email}'
    const validation = validateLeadsFields([lead], template)

    expect(validation.areAllValid).toBe(false)
    expect(validation.leads.length).toBe(1)
    expect(validation.leads[0].isValid).toBe(false)
    expect(validation.leads[0].invalidFields.length).toBe(1)
    expect(validation.leads[0].invalidFields[0]).toBe('email')
  })
})
