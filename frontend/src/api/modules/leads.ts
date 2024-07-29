import { LeadsCreateInput, LeadsCreateOutput } from '../types/leads/create'
import { LeadsDeleteInput, LeadsDeleteOutput } from '../types/leads/delete'
import { LeadsGetManyInput, LeadsGetManyOutput } from '../types/leads/getMany'
import { LeadsGetOneInput, LeadsGetOneOutput } from '../types/leads/getOne'
import { LeadsUpdateSomeInput, LeadsUpdateSomeOutput } from '../types/leads/updateSome'
import { GuessLeadGenderInput, GuessLeadGenderOutput } from '../types/leads/guessGender'
import { ApiModule, endpoint } from '../utils'

export const leadsApi = {
  getMany: endpoint<LeadsGetManyOutput, LeadsGetManyInput>('get', '/leads'),
  getOne: endpoint<LeadsGetOneOutput, LeadsGetOneInput>('get', ({ id }) => `/leads/${id}`),
  create: endpoint<LeadsCreateOutput, LeadsCreateInput>('post', '/leads'),
  delete: endpoint<LeadsDeleteOutput, LeadsDeleteInput>('delete', ({ id }) => `/leads/${id}`),
  guessGender: endpoint<GuessLeadGenderOutput, GuessLeadGenderInput>(
    'put',
    ({ id }) => `/leads/${id}/guess-gender`
  ),
  updateSome: endpoint<LeadsUpdateSomeOutput, LeadsUpdateSomeInput>('patch', ({ id }) => `/leads/${id}`),
} as const satisfies ApiModule
