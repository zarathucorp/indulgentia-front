export interface BaseBucketType {
	bucket_name: string;
	bucket_status: string;
	bucket_owner: string;
	bucket_uuid: string;
	has_github: boolean;
	github_link?: string;
}

interface BucketWithGitHub extends BaseBucketType {
	has_github: true;
	github_link: string; // Make github_link mandatory
}

// Extend the base interface for cases where has_github is false
interface BucketWithoutGitHub extends BaseBucketType {
	has_github: false;
	github_link?: never; // Ensure that github_link cannot be provided
}

type BucketType = BucketWithGitHub | BucketWithoutGitHub;

export default BucketType;
