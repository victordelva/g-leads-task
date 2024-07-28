import {Gender} from "../../Domain/Model/Gender";
import detectGender from "detect-gender";
import {GenderGuesserService} from "../../Domain/Services/GenderGuesserService";

export class GenderGuesserServiceImpl implements GenderGuesserService{
	async guessGender(name: string): Promise<Gender> {
		const gender = await detectGender(name);
		return gender as Gender;
	}
}