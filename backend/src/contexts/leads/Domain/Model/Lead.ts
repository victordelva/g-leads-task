export class Lead {
	id: string;
	isSelected: boolean;
	firstName: string;
	lastName: string;
	countryCode: string;
	email: string;

	constructor({id, isSelected, firstName, lastName, countryCode, email}:{id: string, isSelected: boolean, firstName: string, lastName: string, countryCode: string, email: string}) {
		this.id = id;
		this.isSelected = isSelected;
		this.firstName = firstName;
		this.lastName = lastName;
		this.countryCode = countryCode;
		this.email = email;
	}
}