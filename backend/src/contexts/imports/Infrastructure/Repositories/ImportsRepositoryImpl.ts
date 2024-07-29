import { ImportsRepository } from '../../Domain/Repositories/ImportsRepository'
import { PrismaClient } from '@prisma/client'
import { ImportLeadData } from '../../Domain/Model/ImportLeadData'
import Import from '../../Domain/Model/Import'
const prisma = new PrismaClient()

export class ImportsRepositoryImpl implements ImportsRepository {
  constructor() {}
  async create(data: ImportLeadData[]): Promise<Import> {
    const imported = await prisma.imports.create({
      data: {
        data: JSON.stringify(data.map((lead) => lead.toObject())),
        isFullValid: data.every((lead) => lead.isValid),
      },
    })
    return new Import({
      id: imported.id,
      data: data,
    })
  }

  async get(id: string): Promise<Import> {
    const imported = await prisma.imports.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!imported) {
      throw new Error('Import not found')
    }
    return new Import({
      id: imported.id,
      data: JSON.parse(imported.data).map((lead: any) => ImportLeadData.fromObject(lead)),
    })
  }
}
