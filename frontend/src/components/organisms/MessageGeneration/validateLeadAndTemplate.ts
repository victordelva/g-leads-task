import {Lead} from "../../../types/Lead.ts";

interface ValidationLead {
	leadId: number;
	isValid: boolean;
	firstName?: string;
	lastName?: string;
	invalidFields: string[];
}

export interface LeadValidation {
	leads: ValidationLead[];
	areAllValid: boolean;
}

export function validateLeadsFields(leads: Lead[], template: string): LeadValidation {
	const templateFields = extractTemplateFields(template);
	const validations: ValidationLead[] = [];
	leads.forEach(lead => {
		const invalidFields = extractInvalidFields(lead, templateFields);
		validations.push({
			leadId: lead.id,
			firstName: lead.firstName,
			lastName: lead.lastName,
			isValid: invalidFields.length === 0,
			invalidFields,
		} as ValidationLead);
	});

	return {
		leads: validations,
		areAllValid: validations.every(lead => lead.isValid),
	} as LeadValidation;
}

function extractTemplateFields(messageTemplate: string): string[] {
	const regex = /{([a-zA-Z]+)}/g;
	const matches = messageTemplate.match(regex);
	return matches?.map(match => match.slice(1, -1)) ?? [];
}

function extractInvalidFields(lead: Lead, templateFields: string[]): string[] {
	const invalidFields: string[] = [];
	const leadAsAny = lead as { [key: string]: unknown };

	templateFields.forEach(field => {
		if (!leadAsAny[field]) {
			invalidFields.push(field);
		}
	});

	return invalidFields;
}