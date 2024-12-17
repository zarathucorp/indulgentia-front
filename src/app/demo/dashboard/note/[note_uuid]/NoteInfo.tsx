"use client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import useSWRImmutable from "swr/immutable";
import { useParams } from "next/navigation";
import axios from "axios";
import { UUID } from "crypto";
import { NoteTypeDetail } from "@/types/NoteType";
import { Label } from "@/components/ui/label";

export default function NoteInfo() {
  const params = useParams<{ note_uuid: string }>();
  const { data, isLoading, error } = useSWRImmutable<NoteTypeDetail>(
    process.env.NEXT_PUBLIC_API_URL +
      `/demo/dashboard/note/${params.note_uuid}`,
    async (url: string) => {
      const { data } = await axios.get(url);
      if (data.status !== "succeed") {
        const error = new Error("An error occurred while fetching the data.");
        throw error;
      }
      console.log(data.data);
      return data.data;
    }
  );
  return isLoading
    ? null
    : data && (
        <>
          <Card>
            <CardHeader>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                노트 이름
              </p>
              <CardTitle>{data.note_title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.is_github && (
                <div>
                  <Label>GitHub 활동에 의해 생성된 노트입니다.</Label>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      작성자
                    </p>
                    <p className="font-medium">
                      {data.last_name === null && data.first_name === null
                        ? "설정된 이름이 없습니다"
                        : (data.last_name ?? "") +
                          " " +
                          (data.first_name ?? "")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      프로젝트
                    </p>
                    <p className="font-medium">{data.project_title}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      버킷
                    </p>
                    <p className="font-medium">{data.bucket_title}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      노트 고유 ID
                    </p>
                    <p className="font-medium">{data.note_id}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      블록체인 기록 ID
                    </p>
                    <p className="font-medium">
                      {data.timestamp_transaction_id}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      );
}
