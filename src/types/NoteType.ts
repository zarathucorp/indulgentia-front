import { UUID } from "crypto";

export interface BaseNoteType {
	id: UUID;
	title: string;
	user_id: UUID;
	created_at: Date;
	file_name: string;
	// GitHub 연동된 항목인지 체크
	is_github: boolean;
}

interface BaseNoteTypWithUserSetting extends BaseNoteType {
	user_setting: {
		email: string,
		team_id: UUID,
		is_admin: boolean,
		last_name: string,
		first_name: string,
		is_deleted: boolean,
		github_token: string,
		has_signature: boolean,
		last_note_created_at: Date,
	}
}

interface NoteWithGitHub extends BaseNoteType {
	is_github: true; // Make github_link mandatory
	github_type: "Commit" | "PR" | "Issue";
	github_hash: string;
	github_link: string;
}

interface NoteWithGithubAndUserSetting extends BaseNoteTypWithUserSetting {
	is_github: true; // Make github_link mandatory
	github_type: "Commit" | "PR" | "Issue";
	github_hash: string;
	github_link: string;
}

// Extend the base interface for cases where has_github is false
interface NoteWithoutGitHub extends BaseNoteType {
	is_github: false;
	github_type: never;
	github_link: never; // Ensure that github_link cannot be provided
}

interface NoteWithoutGithubAndUserSetting extends BaseNoteTypWithUserSetting {
	is_github: false;
	github_type: never;
	github_link: never; // Ensure that github_link cannot be provided
}

type NoteType = NoteWithGitHub | NoteWithoutGitHub;

type NoteTypeWithUserSetting = NoteWithGithubAndUserSetting | NoteWithoutGithubAndUserSetting;

type NoteTypeDetail = NoteType & {
	first_name?: string;
	last_name?: string;
	bucket_title: string;
	project_title: string;
	note_title: string;
	note_id: UUID;
	timestamp_transaction_id: string;
};

export default NoteType;
export type { NoteTypeDetail, NoteTypeWithUserSetting };
