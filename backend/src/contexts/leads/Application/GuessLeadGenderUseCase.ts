import {LeadRepository} from "../Domain/Repositories/LeadRepository";
import {Lead} from "../Domain/Model/Lead";
import {GenderGuesserService} from "../Domain/Services/GenderGuesserService";

export class GuessLeadGenderUseCase {
	constructor(
		private readonly leadRepository: LeadRepository,
		private readonly genderGuesser: GenderGuesserService,
	) {}

	async execute({
		id,
	}: {
		id: string;
	}): Promise<Lead> {

		const lead = await this.leadRepository.get(id);
		const gender = await this.genderGuesser.guessGender(lead.firstName);

		return await this.leadRepository.patch({
			id,
			gender,
		});
	}
}