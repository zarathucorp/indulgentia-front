import { UUID } from "crypto";

export interface TeamUserType {
	id: UUID;
	email: string;
	first_name: string | null;
	last_name: string | null;
}
