import { ApiModule, endpoint } from '../utils'
import { ProcessImportInput, ProcessImportOutput } from '../types/imports/processImport.ts'

export const importsApi = {
  process: endpoint<ProcessImportOutput, ProcessImportInput>('post', '/imports'),
} as const satisfies ApiModule
