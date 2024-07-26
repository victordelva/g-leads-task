import {LeadRepository} from "../../Domain/Repositories/LeadRepository";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export class LeadRepositoryImpl implements LeadRepository {
	constructor() {}

	async delete(id: string): Promise<void> {
		await prisma.lead.delete({
			where: {
				id: Number(id),
			},
		});
	}
}