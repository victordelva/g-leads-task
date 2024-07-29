import Import from '../Model/Import'

export interface ImportsRepository {
  create(data: { [key: string]: string | number | boolean | Date }[]): Promise<Import>
}
