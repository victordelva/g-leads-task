import { LeadsCreateInput, LeadsCreateOutput } from '../types/leads/create'
import { LeadsDeleteInput, LeadsDeleteOutput } from '../types/leads/delete'
import { LeadsGetManyInput, LeadsGetManyOutput } from '../types/leads/getMany'
import { LeadsGetOneInput, LeadsGetOneOutput } from '../types/leads/getOne'
import { LeadsUpdateInput, LeadsUpdateOutput } from '../types/leads/update'
import { ApiModule, endpoint } from '../utils'

export const leadsApi = {
  getMany: endpoint<LeadsGetManyOutput, LeadsGetManyInput>('get', '/leads'),
  getOne: endpoint<LeadsGetOneOutput, LeadsGetOneInput>('get', ({ id }) => `/leads/${id}`),
  create: endpoint<LeadsCreateOutput, LeadsCreateInput>('post', '/leads'),
  delete: endpoint<LeadsDeleteOutput, LeadsDeleteInput>('delete', ({ id }) => `/leads/${id}`),
  // update: endpoint<LeadsUpdateOutput, LeadsUpdateInput>('put', ({ id }) => `/leads/${id}`),
  updateSome: endpoint<LeadsUpdateOutput, LeadsUpdateInput>('patch', ({ id }) => `/leads/${id}`),
} as const satisfies ApiModule
