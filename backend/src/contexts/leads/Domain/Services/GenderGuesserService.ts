import {Gender} from "../Model/Gender";

export interface GenderGuesserService {
	guessGender(name: string): Promise<Gender>;
}