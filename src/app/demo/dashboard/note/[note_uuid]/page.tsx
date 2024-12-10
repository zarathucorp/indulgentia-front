"use client";
import PDFViewer from "@/components/global/PDFViewer";
import { Button } from "@/components/ui/button";
import NoteBreadcrumb from "./NoteBreadcrumb";
import NoteAuditLog from "./NoteAuditLog";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { DashboardBreadCrumb } from "@/components/modules/demo/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ErrorPage } from "@/components/global/Error/Error";
import { NoteLoading } from "@/components/global/Loading/Note";
import NoteInfo from "./NoteInfo";
const getDownloadURL = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const blob = await res.blob();
  const downloadUrl = window.URL.createObjectURL(blob);

  return downloadUrl;
};

export default function ViewNote() {
  const params = useParams<{ note_uuid: string }>();
  const [downloadURL, setDownloadURL] = useState<string>("");
  const { toast } = useToast();

  const { data, isValidating, error, mutate, isLoading } = useSWRImmutable(
    process.env.NEXT_PUBLIC_API_URL +
      `/demo/dashboard/note/file/${params.note_uuid}`,
    async (url) => {
      const result = await axios.get(url);
      if (result.status !== 200) {
        const error = new Error("An error occurred while fetching the data.");
        throw error;
      }
      setDownloadURL(await getDownloadURL(result.data.url));
      return result.data.url;
    }
  );

  const { data: breadcrumbData, isLoading: isBreadcrumbLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_URL +
      `/demo/dashboard/note/${params.note_uuid}/breadcrumb`,
    async (url) => {
      const result = await axios.get(url);
      if (result.status !== 200) {
        const error = new Error("An error occurred while fetching the data.");
        throw error;
      }
      return result.data.data;
    }
  );
  if (error)
    return (
      <>
        <ErrorPage error={error} reset={() => mutate()} />
      </>
    );

  // // 파일 다운로드용 URL 생성
  // useEffect(() => {
  // 	fetchDownloadUrl();
  // }, [data]);

  return (
    <>
      <div className="py-3 pl-4">
        {/* <NoteBreadcrumb /> */}
        {isBreadcrumbLoading ? (
          <DashboardBreadCrumbLoading type="Note" />
        ) : (
          <DashboardBreadCrumb
            breadcrumbData={{
              level: "Note",
              note_id: params.note_uuid,
              ...breadcrumbData,
            }}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] lg:grid-cols-[3fr_1fr]">
        <div className="px-2">
          {isLoading ? (
            <NoteLoading />
          ) : (
            <>
              {<PDFViewer fileUrl={data} className="h-screen-minus-navbar" />}
            </>
          )}
        </div>
        <div className="flex flex-col ">
          <NoteInfo />
          <a
            href={downloadURL || "#"}
            download={`Report_${params.note_uuid}.pdf`}
          >
            <Button className="py-2 w-full">노트 다운로드</Button>
          </a>
          {breadcrumbData && (
            <Button
              onClick={() => {
                toast({
                  title: "노트 삭제",
                  description: `데모 페이지에서는 노트 삭제 기능을 지원하지 않습니다.`,
                });
              }}
              className="bg-red-500 hover:bg-red-700"
            >
              노트 삭제
            </Button>
          )}
          {/* <NoteAuditLog /> */}
        </div>
      </div>
    </>
  );
}
