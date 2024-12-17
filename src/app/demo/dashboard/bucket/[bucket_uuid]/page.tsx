"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { format } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 로케일 추가
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DashboardBreadCrumb } from "@/components/modules/demo/dashboard/DashboardBreadCrumb";
import { DashboardBreadCrumbLoading } from "@/components/global/Loading/BreadCrumb";
import { ErrorPage } from "@/components/global/Error/Error";
import RemoveModal from "@/components/global/RemoveModal";
import { NoNote } from "@/components/global/NoContent";
import NotedownloadForm from "@/components/modules/demo/dashboard/bucket/NotedownloadForm";

import convertKST from "@/utils/time/convertKST";
import NoteType, { NoteTypeWithUserSetting } from "@/types/NoteType";
import { FaArrowsRotate } from "react-icons/fa6";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Wrench } from "lucide-react";

// API fetcher 함수
const fetcher = async (url: string) => {
  const result = await axios.get(url);
  if (result.status !== 200) {
    throw new Error("An error occurred while fetching the data.");
  }
  return result.data.data;
};

export default function Note() {
  const params = useParams<{ bucket_uuid: string }>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [toggleDownload, setToggleDownload] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const { toast } = useToast();

  // SWR을 사용한 데이터 fetching
  const {
    data: notes,
    error: noteError,
    mutate: mutateNoteList,
  } = useSWR<NoteTypeWithUserSetting[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/demo/dashboard/note/list/${params.bucket_uuid}`,
    fetcher
  );

  const { data: breadcrumbData, isLoading: isBreadcrumbLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/demo/dashboard/bucket/${params.bucket_uuid}/breadcrumb`,
    fetcher
  );

  // 날짜 범위 선택 핸들러
  const handleDateRangeSelect = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
  }, []);

  // 날짜 범위에 따른 노트 필터링
  const filteredNotes =
    dateRange?.from && dateRange?.to
      ? notes?.filter((note) => {
          const noteDate = new Date(note.created_at);
          return noteDate >= dateRange.from! && noteDate <= dateRange.to!;
        })
      : notes;

  // 선택된 날짜 범위를 한국어로 표시하는 함수
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "조회할 날짜 범위를 선택하세요";
    if (!range.to)
      return format(range.from, "yyyy년 MM월 dd일", { locale: ko });
    return `${format(range.from, "yyyy년 MM월 dd일", {
      locale: ko,
    })} - ${format(range.to, "yyyy년 MM월 dd일", { locale: ko })}`;
  };

  // 노트 클릭 핸들러
  const handleNoteClick = (noteId: string) => {
    setSelectedNotes((prevSelectedNotes) => {
      const newSelectedNotes = prevSelectedNotes.includes(noteId)
        ? prevSelectedNotes.filter((id) => id !== noteId)
        : [...prevSelectedNotes, noteId];
      return newSelectedNotes;
    });
  };

  // toggleDownload 상태 변경 핸들러
  const handleToggleDownload = () => {
    setToggleDownload((prevToggleDownload) => {
      if (prevToggleDownload) {
        setSelectedNotes([]);
      }
      return !prevToggleDownload;
    });
  };

  // 전체 선택 함수
  const handleSelectAll = () => {
    if (filteredNotes) {
      if (selectedNotes.length === filteredNotes.length) {
        setSelectedNotes([]);
      } else {
        const allNoteIds = filteredNotes.map((note) => note.id);
        setSelectedNotes(allNoteIds);
      }
    }
  };

  if (noteError)
    return <ErrorPage error={noteError} reset={() => mutateNoteList()} />;

  return (
    <>
      <div className="py-3 pl-4">
        {isBreadcrumbLoading ? (
          <DashboardBreadCrumbLoading type="Bucket" />
        ) : (
          <DashboardBreadCrumb
            breadcrumbData={{
              level: "Bucket",
              bucket_id: params.bucket_uuid,
              ...breadcrumbData,
            }}
          />
        )}
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-[3fr_1fr] gap-6 p-6 sm:p-10 ">
        <div className="space-y-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredNotes?.map((note: NoteTypeWithUserSetting) => (
                <Card
                  key={note.id}
                  // className={`${selectedNotes.includes(note.id) ? "bg-blue-100" : ""}`}
                  className={cn(
                    `${selectedNotes.includes(note.id) ? "bg-blue-100" : ""}`,
                    `${toggleDownload ? "cursor-pointer" : ""}`
                  )}
                  onClick={() => toggleDownload && handleNoteClick(note.id)}
                >
                  <CardHeader className="relative">
                    {toggleDownload && selectedNotes.includes(note.id) ? (
                      <Badge className="absolute top-0 left-0">
                        {selectedNotes.indexOf(note.id) + 1}
                      </Badge>
                    ) : (
                      <Badge className="absolute invisible top-0 left-0" />
                    )}
                    <CardTitle>{note.title}</CardTitle>
                    {/* <CardDescription>노트 ID: {maskUUID(note.id)}</CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          className={`${
                            toggleDownload ? "cursor-pointer" : ""
                          }`}
                        >
                          생성일시: {convertKST(note.created_at)}
                        </Label>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          className={`${
                            toggleDownload ? "cursor-pointer" : ""
                          }`}
                        >
                          작성자: {note.user_setting.last_name}{" "}
                          {note.user_setting.first_name}
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {!toggleDownload ? (
                      <>
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
                        <Link href={`/demo/dashboard/note/${note.id}`}>
                          <Button>노트 보기</Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          className="bg-red-500 hover:bg-red-700"
                        >
                          노트 삭제
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredNotes?.length === 0 && <NoNote />}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Button
              onClick={() => {
                toast({
                  title: "노트 생성",
                  description: `데모 페이지에서는 노트 생성 기능을 지원하지 않습니다.`,
                });
              }}
              className="w-full"
            >
              노트 생성
            </Button>
            <Button onClick={handleToggleDownload} className="w-full">
              노트 다운로드
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "버킷 설정",
                  description: `데모 페이지에서는 버킷 설정 기능을 지원하지 않습니다.`,
                });
              }}
              variant={"outline"}
              className="w-full pr-[40px]"
            >
              <Wrench />
              &nbsp;버킷 설정
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-start text-left font-normal"
                  variant="outline"
                >
                  <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                  {formatDateRange(dateRange)}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="center" className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateRangeSelect}
                  initialFocus
                  locale={ko} // 캘린더에 한국어 로케일 적용
                />
              </PopoverContent>
            </Popover>
            <Button
              className="inline-flex items-center justify-center rounded-md bg-gray-900 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              onClick={() => setDateRange(undefined)}
              disabled={!dateRange}
            >
              <FaArrowsRotate />
            </Button>
          </div>
        </div>
      </div>
      {toggleDownload ? (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/75 text-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              선택된 노트: <strong>{selectedNotes.length}</strong> 개
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSelectAll}>
                {selectedNotes.length === filteredNotes?.length
                  ? "전체 선택 해제"
                  : "전체 선택"}
              </Button>
              <Dialog>
                <DialogTrigger asChild disabled={selectedNotes.length === 0}>
                  <Button disabled={selectedNotes.length === 0}>
                    다운로드
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>다운로드 설정</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <NotedownloadForm selectedNotes={selectedNotes} />
                </DialogContent>
              </Dialog>
              <Button variant={"destructive"} onClick={handleToggleDownload}>
                취소
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
