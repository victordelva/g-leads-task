import ImportHistoryQueryResponse from './ImportHistoryQueryResponse'
import ImportHistoryQuery from './ImportHistoryQuery'

export default class ImportHistoryQueryHandler {
  constructor() {}

  async execute(query: ImportHistoryQuery): Promise<ImportHistoryQueryResponse> {
    // this is and example
    return new ImportHistoryQueryResponse()
  }
}
