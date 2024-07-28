import {LeadRepository} from "../Domain/Repositories/LeadRepository";
import {Lead} from "../Domain/Model/Lead";

export class UpdateLeadUseCase {
	constructor(private readonly leadRepository: LeadRepository) {}

	async execute({
		id,
		message,
		gender,
	}: {
		id: string;
		message?: string;
		gender?: string;
	}): Promise<Lead> {
		return await this.leadRepository.patch({
			id,
			message,
			gender,
		});
	}
}