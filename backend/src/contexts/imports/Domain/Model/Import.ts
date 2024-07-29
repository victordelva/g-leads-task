import { ImportLeadData } from './ImportLeadData'

export default class Import {
  id: number
  data: ImportLeadData[]
  constructor({ id, data }: { id: number; data: ImportLeadData[] }) {
    this.id = id
    this.data = data
  }

  get isValid() {
    return this.data.every((lead) => lead.isValid)
  }
}
