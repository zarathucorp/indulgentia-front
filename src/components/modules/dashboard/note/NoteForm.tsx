"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import FileUploader from "@/components/global/FileUploader";
import { getErrorMessageToast } from "@/hooks/error.tsx";
import { useToast } from "@/components/ui/use-toast";
import { ActionButton } from "@/components/ui/actionbutton";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/global/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { FaRegCircleQuestion } from "react-icons/fa6";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const NoteSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "노트 이름은 1자보다 길어야 합니다.",
    })
    .max(1000, {
      message: "노트 이름은 1,000자보다 짧아야 합니다.",
    }),
  description: z
    .string()
    .max(1000, {
      message:
        "노트 내용은 1000자보다 짧아야 합니다. 많은 내용이 필요하면 파일 첨부 방식을 이용해주세요.",
    })
    .refine(
      (value: string) => {
        const valueArray = value
          .split("\n")
          .filter((line) => line.trim() !== "");
        if (valueArray.length > 20) {
          return false;
        }
        return true;
      },
      {
        message:
          "노트 내용은 20줄보다 짧아야 합니다. 많은 내용이 필요하면 파일 첨부 방식을 이용해주세요.",
      }
    )
    .optional(),
  tags: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
  bucket_id: z.string().uuid(),
});

export type CreateNoteFormValues = z.infer<typeof NoteSchema>;

export default function NewNoteForm() {
  const { toast } = useToast();
  const [userUUID, setUserUUID] = useState<string | null>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const bucketUUID: string = searchParams.get("bucket") as string;
  const [pdfUrl, setPdfUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [noteId, setNoteId] = useState<string | null>(null);

  // sendData
  const [sendData, setSendData] = useState<FormData>(new FormData());

  const defaultValues: Partial<CreateNoteFormValues> = {
    bucket_id: bucketUUID,
  };

  const form = useForm<CreateNoteFormValues>({
    resolver: zodResolver(NoteSchema),
    defaultValues,
  });

  async function onPreviewSubmit(data: CreateNoteFormValues) {
    setIsSubmitting(true);
    const validationResult = NoteSchema.safeParse(data);
    if (!validationResult.success) {
      console.error(validationResult.error.errors);
      return;
    }

    const newFormData = new FormData();
    if (data.files) {
      data.files.forEach((file) => {
        console.log(file);
        newFormData.append("files", file);
      });
    }

    newFormData.append("title", data.title);
    newFormData.append("file_name", data.title);
    newFormData.append("bucket_id", data.bucket_id);
    newFormData.append(
      "description",
      (data.description && data.description) || ""
    );
    newFormData.append("is_github", false.toString());

    setSendData(newFormData);

    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/dashboard/note/",
        newFormData,
        {
          timeout: 120000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Blob 형태로 응답 받기
        }
      );
      console.log(result);

      // note id를 받아옴
      console.log("note id", result.headers["x-note-id"]);
      setNoteId(result.headers["x-note-id"]);

      // PDF 파일 URL을 받아옴
      const blob = new Blob([result.data], {
        type: result.headers["content-type"],
      });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
      setIsOpen(true);
    } catch (error: any) {
      toast({
        title: "노트를 생성하지 못했습니다.",
        description: getErrorMessageToast(error),
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCreateNote() {
    setIsSubmitting(true);

    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/dashboard/note/${noteId}/accept`,
        sendData,
        {
          timeout: 120000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      setIsOpen(false);

      toast({
        title: "노트를 생성했습니다.",
        description: `노트 ${form.getValues(
          "title"
        )}이 성공적으로 생성되었습니다.`,
      });
      router.push(`/dashboard/bucket/${form.getValues("bucket_id")}`);
    } catch (error: any) {
      toast({
        title: "노트를 생성하지 못했습니다.",
        description: getErrorMessageToast(error),
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isCancelRequested, setIsCancelRequested] = useState(false);

  const handleCancel = () => {
    if (!isCancelRequested) {
      sendCancelRequest();
      setIsCancelRequested(true);
    }
    setIsOpen(false);
  };

  const handleCloseDialog = () => {
    if (!isCancelRequested) {
      sendCancelRequest();
      setIsCancelRequested(true);
    }
    setIsOpen(false);
  };

  const sendCancelRequest = async () => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/dashboard/note/${noteId}/reject`,
        sendData,
        {
          timeout: 120000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Cancel request sent");
    } catch (error) {
      console.error("Error sending cancel request", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => {
        sendCancelRequest();
        setIsCancelRequested(true);
      }, 600000); // 600초 후에 요청을 보냄
      setTimeoutId(id);
    } else if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen]);

  return (
    <div className="w-full lg:w-1/2 my-4 mx-4 sm:mx-4 lg:mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onPreviewSubmit)}
          className="space-y-8"
        >
          <NoteTitleField form={form} />
          <NoteDescriptionField form={form} />
          <NoteFileField form={form} />
          <NoteTagField form={form} />
          <BucketUUIDField form={form} />
          <div className="flex justify-center">
            <ActionButton type="submit">
              {isSubmitting && <Spinner />}&nbsp;노트 미리보기
            </ActionButton>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">노트 미리보기</DialogTitle>
                <DialogDescription></DialogDescription>
                <div className="flex justify-center pt-4">
                  <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    width="400"
                    height="600"
                    title="PDF Preview"
                  ></iframe>
                </div>
              </DialogHeader>
              <DialogFooter>
                <div>
                  <Button onClick={handleCreateNote}>
                    {isSubmitting && <Spinner />}&nbsp;새 노트 생성
                  </Button>
                  <Button variant={"destructive"} onClick={handleCancel}>
                    {isCanceling && <Spinner />}&nbsp;취소
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  );
}

function NoteTitleField({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>노트 이름</FormLabel> */}
          <TooltipProvider>
            <FormLabel>
              노트 이름&nbsp;{" "}
              <Tooltip delayDuration={100}>
                <TooltipTrigger type="button">
                  <FaRegCircleQuestion />
                </TooltipTrigger>
                <TooltipContent>
                  <p>노트 이름을 텍스트로 입력합니다.</p>
                </TooltipContent>
              </Tooltip>
            </FormLabel>
          </TooltipProvider>
          <FormControl>
            <Input placeholder="노트 이름" {...field} />
          </FormControl>
          {/* <FormDescription>노트 이름을 입력합니다.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function NoteDescriptionField({ form }: { form: any }) {
  // useEffect(() => {
  //   const description = form.watch("description");
  //   if (typeof description === "string") {
  //     console.log("text size", description.length);
  //     console.log("text line count", description.split("\n").length);
  //   }
  // }, [form.watch("description")]);

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>노트 내용</FormLabel> */}
          <TooltipProvider>
            <FormLabel>
              노트 내용&nbsp;{" "}
              <Tooltip delayDuration={100}>
                <TooltipTrigger type="button">
                  <FaRegCircleQuestion />
                </TooltipTrigger>
                <TooltipContent>
                  <p>노트 내용을 텍스트로 입력합니다.</p>
                  <p>마크 다운 형식으로 작성할 수 있습니다.</p>
                  <p>
                    <i>* 많은 내용이 필요하면 파일 첨부 방식을 이용해주세요.</i>
                  </p>
                </TooltipContent>
              </Tooltip>
            </FormLabel>
          </TooltipProvider>
          <FormControl>
            {/* <Textarea placeholder="노트 내용을 입력하여 주십시오." {...field} /> */}
            <MarkdownEditor
              onChange={field.onChange}
              value={field.value}
              style={{ minHeight: "300px" }} // 기본 수직 크기 설정
            />
          </FormControl>
          {/* <FormDescription>노트 내용을 입력합니다.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function NoteTagField({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>노트 태그</FormLabel> */}
          <TooltipProvider>
            <FormLabel>
              노트 태그&nbsp;{" "}
              <Tooltip delayDuration={100}>
                <TooltipTrigger type="button">
                  <FaRegCircleQuestion />
                </TooltipTrigger>
                <TooltipContent>
                  <p>&quot;,&quot;로 구분된 태그를 입력합니다.</p>
                  <p className="text-gray-500">
                    <i>* 구현 예정</i>
                  </p>
                </TooltipContent>
              </Tooltip>
            </FormLabel>
          </TooltipProvider>
          <FormControl>
            <Input placeholder="노트 태그" {...field} />
          </FormControl>
          {/* <FormDescription>&quot;,&quot;로 구분된 태그를 입력합니다.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function NoteFileField({ form }: { form: any }) {
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      form.setValue("files", Array.from(files));
      setIsFileSelected(true);
    }
  };

  const handleFileUnselect = () => {
    form.setValue("files", []);
    setIsFileSelected(false);
  };

  return (
    <FormField
      control={form.control}
      name="files"
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>노트 파일</FormLabel> */}
          <TooltipProvider>
            <FormLabel>
              노트 파일&nbsp;{" "}
              <Tooltip delayDuration={100}>
                <TooltipTrigger type="button">
                  <FaRegCircleQuestion />
                </TooltipTrigger>
                <TooltipContent>
                  <p>노트 파일을 업로드합니다.</p>
                  <p>* 권장사항</p>
                  <p>
                    - 파일 형식: PPT, PPTX, DOC, DOCX, XLS, XLSX, HWP, HWPX,
                    JPG, PNG, PDF, MD
                  </p>
                  <p>- 파일 갯수: 20개 이하</p>
                </TooltipContent>
              </Tooltip>
            </FormLabel>
          </TooltipProvider>
          <FormControl>
            <FileUploader
              typeString=""
              multiple
              onChange={handleFileChange}
              isFileSelected={isFileSelected}
              fileUnselectHandling={handleFileUnselect}
              accept="application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/x-hwp,application/x-hwpx,image/jpeg,image/png,application/pdf,.hwp,.hwpx,.md,.markdown"
            />
          </FormControl>
          {/* <FormDescription>노트 파일을 업로드합니다.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function BucketUUIDField({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="bucket_id"
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>버킷 UUID</FormLabel> */}
          <TooltipProvider>
            <FormLabel hidden>
              버킷 UUID&nbsp;{" "}
              <Tooltip delayDuration={100}>
                <TooltipTrigger type="button">
                  <FaRegCircleQuestion />
                </TooltipTrigger>
                <TooltipContent>
                  <p>버킷 UUID입니다.</p>
                </TooltipContent>
              </Tooltip>
            </FormLabel>
          </TooltipProvider>
          <FormControl>
            <Input type="hidden" disabled {...field} />
          </FormControl>
          {/* <FormDescription>버킷 UUID입니다.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
