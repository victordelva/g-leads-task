export interface LeadRepository {
	delete(id: string): Promise<void>;
}