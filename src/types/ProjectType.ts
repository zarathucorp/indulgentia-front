import { UUID } from "crypto";

export default interface ProjectType {
	id: UUID;
	project_leader?: string;
	title: string;
	grant_number?: string;
	status?: string;
	start_date?: Date | string;
	end_date?: Date | string;
}
