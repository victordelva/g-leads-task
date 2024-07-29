import { leadsApi } from './modules/leads'
import { ApiModule } from './utils'
import { importsApi } from './modules/imports.ts'

export const api = {
  leads: leadsApi,
  imports: importsApi,
} as const satisfies ApiModule

export { useApiMutation } from './mutations/useApiMutation'
export type { ApiInput, ApiOutput } from './utils'
