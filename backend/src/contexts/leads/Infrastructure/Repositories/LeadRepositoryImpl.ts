import {LeadRepository} from "../../Domain/Repositories/LeadRepository";
import {PrismaClient} from "@prisma/client";
import {Lead} from "../../Domain/Model/Lead";
import {Gender} from "../../Domain/Model/Gender";
const prisma = new PrismaClient()

export class LeadRepositoryImpl implements LeadRepository {
	constructor() {}

	async get(id: string): Promise<Lead> {
		const lead = await prisma.lead.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (!lead) {
			throw new Error("Lead not found");
		}

		return Lead.fromPrisma(lead);
	}

	async delete(id: string): Promise<void> {
		await prisma.lead.delete({
			where: {
				id: Number(id),
			},
		});
	}

	async patch({
		id,
    message,
    gender,
	}:{
		id: string,
		message?: string,
		gender?: Gender
	}): Promise<Lead> {

		const data: {
			message?: string
			gender?: string
		} = {};

		if (message) data.message = String(message);
		if (gender) data.gender = String(gender);

		const lead = await prisma.lead.update({
			where: {
				id: Number(id),
			},
			data,
		});

		return Lead.fromPrisma(lead);
	}
}