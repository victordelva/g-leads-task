import { ApiModule, endpoint } from '../utils'
import { ProcessImportInput, ProcessImportOutput } from '../types/imports/processImport.ts'
import { ConfirmImportInput, ConfirmImportOutput } from '../types/imports/confirmImport.ts'

export const importsApi = {
  process: endpoint<ProcessImportOutput, ProcessImportInput>('post', '/imports'),
  confirmImport: endpoint<ConfirmImportOutput, ConfirmImportInput>(
    'put',
    ({ id }) => `/imports/${id}/confirm`
  ),
} as const satisfies ApiModule
