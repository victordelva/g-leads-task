import { parse } from 'csv-parse/sync'

export default class CSVParserService {
  constructor() {}

  parseCsvData(csvData: string): { [key: string]: string | number | boolean | Date }[] {
    return parse(csvData, {
      columns: true,
      cast: true,
    })
  }
}
