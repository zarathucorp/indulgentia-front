export default function daysLeft(inputDate: string | null): number {
	if (inputDate === null) return 0;
	// Parse the input date
	const targetDate = new Date(inputDate);
	// Get today's date
	const today = new Date();
	// Calculate the difference in time
	const timeDifference = targetDate.getTime() - today.getTime();
	// Convert time difference from milliseconds to days
	const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
	return daysDifference;
}
