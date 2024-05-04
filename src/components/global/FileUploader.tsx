import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FileUploader({ type }: { type?: string } = { type: "File" }) {
	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor="file">{type}</Label>
			<Input id="file" type="file" accept="image/*,.txt,.pdf,text/*" />
		</div>
	);
}
