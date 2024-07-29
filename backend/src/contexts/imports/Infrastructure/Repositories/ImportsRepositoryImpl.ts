import { ImportsRepository } from '../../Domain/Repositories/ImportsRepository'

export default class ImportsRepositoryImpl implements ImportsRepository {
  async create(
    data: { [key: string]: string | number | boolean | Date }[]
  ): Promise<{ id: string; data: { [key: string]: string | number | boolean | Date }[] }> {
    return { id: 'id', data }
  }
}
