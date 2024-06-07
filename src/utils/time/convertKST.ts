const convertKST = (date: Date) => {
	const utcDate = date;

	const kstDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

	const year = kstDate.getFullYear();
	const month = String(kstDate.getMonth() + 1).padStart(2, "0");
	const day = String(kstDate.getDate()).padStart(2, "0");
	const hours = String(kstDate.getHours()).padStart(2, "0");
	const minutes = String(kstDate.getMinutes()).padStart(2, "0");
	const seconds = String(kstDate.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default convertKST;
