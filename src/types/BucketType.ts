import { GitRepoType } from "./GitRepoType";
export interface BaseBucketType {
	id: string;
	title: string;
	bucket_status?: string;
	bucket_owner?: string;
	is_github: boolean;
	github_link?: string;
	manager_first_name: string;
	manager_last_name: string;
	note_num: number;
	gitrepos: GitRepoType[] | null;
}

interface BucketWithGitHub extends BaseBucketType {
	has_github: true;
	github_link?: string; // Make github_link mandatory
}

// Extend the base interface for cases where has_github is false
interface BucketWithoutGitHub extends BaseBucketType {
	has_github: false;
	github_link?: never; // Ensure that github_link cannot be provided
}

type BucketType = BucketWithGitHub | BucketWithoutGitHub;

export default BucketType;
