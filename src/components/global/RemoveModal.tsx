"use client";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type removeType = "프로젝트" | "Bucket" | "노트";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
export default function CustomModal({ targetEntity, removeType, onRemoveConfirmed }: { targetEntity: string; removeType: removeType; onRemoveConfirmed: () => Promise<void> }) {
	const { toast } = useToast();
	const router = useRouter();
	const [confirmEntityName, setConfirmEntityName] = useState<string>("");
	const handleConfirmEntityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmEntityName(e.target.value);
	};
	const [errorMessage, setErrorMessage] = useState<string>("");
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-red-500">프로젝트 삭제</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<p>
						<b className="text-red-600">삭제</b> - 이 작업은 되돌릴 수 없습니다.
					</p>
					<DialogDescription>
						<p>
							이 작업은 {removeType} &quot;{targetEntity}&quot;를 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다.
						</p>
						<p>
							삭제하려면 &quot;<b>{targetEntity}</b>&quot;라고 입력하십시오.
						</p>
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Input value={confirmEntityName} onChange={handleConfirmEntityNameChange} />
						<p className="text-red-600">{errorMessage}</p>
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<Button
						type="button"
						variant="outline"
						onClick={async () => {
							try {
								if (confirmEntityName !== targetEntity) {
									throw new Error("입력한 값이 삭제할 대상과 일치하지 않습니다.");
								}
								await onRemoveConfirmed();
								setErrorMessage("");
								toast({
									title: "삭제 완료",
									description: `${removeType} "${targetEntity}"의 삭제가 완료되었습니다.`,
								});
								router.push("/dashboard");
							} catch (e: any) {
								setErrorMessage(e.message);
							}
						}}
					>
						삭제하기
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
