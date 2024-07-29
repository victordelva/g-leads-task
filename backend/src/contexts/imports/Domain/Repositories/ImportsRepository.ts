import Import from '../Model/Import'
import { ImportLeadData } from '../Model/ImportLeadData'

export interface ImportsRepository {
  create(data: ImportLeadData[]): Promise<Import>
  get(id: string): Promise<Import>
}
