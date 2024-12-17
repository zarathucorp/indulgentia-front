"use client";
import PDFViewer from "@/components/global/PDFViewer";
import { Button } from "@/components/ui/button";
import NoteBreadcrumb from "./NoteBreadcrumb";
import NoteAuditLog from "./NoteAuditLog";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { DashboardBreadCrumb } from "@/components/modules/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import RemoveModal from "@/components/global/RemoveModal";
import { ErrorPage } from "@/components/global/Error/Error";
import { NoteLoading } from "@/components/global/Loading/Note";
import { handleNoteRemove } from "./handleNoteRemove";
import NoteInfo from "./NoteInfo";
import { useOnborda } from "onborda";
const getDownloadURL = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const blob = await res.blob();
  const downloadUrl = window.URL.createObjectURL(blob);

  return downloadUrl;
};

export default function ViewNote() {
  const params = useParams<{ note_uuid: string }>();
  const [downloadURL, setDownloadURL] = useState<string>("");

  const { startOnborda, currentStep } = useOnborda();

  useEffect(() => {
    const hasVistedDashboardNoteDetail = localStorage.getItem(
      "hasVistedDashboardNoteDetail"
    );
    console.log("hasVistedDashboardNoteDetail", hasVistedDashboardNoteDetail);
    if (!hasVistedDashboardNoteDetail) {
      startOnborda("dashboard-noteDetail");
      localStorage.setItem("hasVistedDashboardNoteDetail", "true");
    }
  }, [startOnborda]);

  const { data, isValidating, error, mutate, isLoading } = useSWRImmutable(
    process.env.NEXT_PUBLIC_API_URL +
      `/dashboard/note/file/${params.note_uuid}`,
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
      `/dashboard/note/${params.note_uuid}/breadcrumb`,
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
      <div id="onborda-step1" className="py-3 pl-4">
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
      <div
        // id="onborda-step2"
        className="grid grid-cols-1 md:grid-cols-[3fr_2fr] lg:grid-cols-[3fr_1fr]"
      >
        <div className="px-2">
          {isLoading ? (
            <NoteLoading />
          ) : (
            <div id="onborda-step3">
              {<PDFViewer fileUrl={data} className="h-screen-minus-navbar" />}
            </div>
          )}
        </div>
        <div className="flex flex-col ">
          <NoteInfo />
          <a
            href={downloadURL || "#"}
            download={`Report_${params.note_uuid}.pdf`}
          >
            <Button id="onborda-step10" className="py-2 w-full">
              노트 다운로드
            </Button>
          </a>
          {breadcrumbData && (
            <RemoveModal
              targetEntity={breadcrumbData.note_title}
              removeType="Note"
              onRemoveConfirmed={() => handleNoteRemove(params.note_uuid)}
              parentUUID={breadcrumbData.bucket_id}
            />
          )}
          {/* <NoteAuditLog /> */}
        </div>
      </div>
    </>
  );
}
