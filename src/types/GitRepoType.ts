import { UUID } from "crypto";

export type GitRepoType = {
	id: UUID;
	created_at: Date;
	updated_at: null;
	bucket_id: UUID;
	repo_url: string;
	user_id: UUID;
	git_username: string;
	git_repository: string;
	is_deleted: boolean;
};
