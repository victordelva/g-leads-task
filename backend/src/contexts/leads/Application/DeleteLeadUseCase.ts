import {LeadRepository} from "../Domain/Repositories/LeadRepository";

export class DeleteLeadUseCase {
	constructor(private readonly leadRepository: LeadRepository) {}

	async execute(id: string): Promise<void> {
		await this.leadRepository.delete(id);
	}
}