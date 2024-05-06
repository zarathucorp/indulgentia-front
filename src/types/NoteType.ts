export interface BaseNoteType {
	note_name: string;
	note_status: string;
	note_owner: string;
	note_uuid: string;
	created_at: Date;
	// GitHub 연동된 항목인지 체크
	is_github: boolean;
}

interface NoteWithGitHub extends BaseNoteType {
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

type NoteType = NoteWithGitHub | NoteWithoutGitHub;

export default NoteType;
