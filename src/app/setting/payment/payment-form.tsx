"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StartTeamPlanButton, AddUserButton } from "./payment-button";
import UserAddModal from "./UserAddModal";
import { useCurrentUserWithPending, useTeamInfo } from "@/hooks/fetch/useTeam";
import { useCurrentPlan, usePaymentHistory } from "@/hooks/fetch/usePayment";
import { PaymentHistoryType } from "@/hooks/fetch/usePayment";
import { useEffect } from "react";
import { useOnborda } from "onborda";
const leftDays = (expireAt: string) => {
  const currentDate: Date = new Date();
  const expireDate: Date = new Date(expireAt);

  // Ensure the expireDate is a valid date
  if (isNaN(expireDate.getTime())) {
    console.log("Invalid expiration date");
    return;
  }

  // Calculate the difference in time (in milliseconds)
  const timeDifference: number = expireDate.getTime() - currentDate.getTime();

  // Convert the time difference from milliseconds to days 마지막날 포함으로 1일 추가
  const daysLeft: number =
    Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

  return daysLeft;
};

function PaymentForm() {
  const { startOnborda, currentStep } = useOnborda();

  useEffect(() => {
    const hasVistedPaymentSetting = localStorage.getItem(
      "hasVistedPaymentSetting"
    );
    console.log("hasVistedPaymentSetting", hasVistedPaymentSetting);
    if (!hasVistedPaymentSetting) {
      startOnborda("setting-payment");
      localStorage.setItem("hasVistedPaymentSetting", "true");
    }
  }, [startOnborda]);
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1">
          <Link href="/pricing">
            <StartTeamPlanButton className="mt-6 w-full" />
          </Link>
          {/* <UserAddModal className="mt-6 w-full" /> */}
          {/* <AddUserButton  /> */}
        </div>
        <CurrentPlan />
        <PaymentHistory />
      </div>
    </div>
  );
}

function CurrentPlan() {
  const {
    currentPlan,
    isLoading,
    error,
    mutate: currentPlanMutate,
  } = useCurrentPlan();
  const {
    numberCurrentUserWithPending,
    isLoading: numberCurrentUserWithPendingLoading,
    isError: numberCurrentUserWithPendingError,
    mutate: currentUserWithPendingMutate,
  } = useCurrentUserWithPending();
  const {
    teamInfo,
    isLoading: teamInfoLoading,
    error: teamInfoError,
    mutate: teamInfoMutate,
  } = useTeamInfo();

  useEffect(() => {
    currentPlanMutate();
    currentUserWithPendingMutate();
    teamInfoMutate();
  }, [currentPlanMutate, currentUserWithPendingMutate, teamInfoMutate]);

  return (
    <div id="onborda-step3" className="bg-card rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">현재 플랜</h2>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between">
          {isLoading ||
            teamInfoLoading ||
            (numberCurrentUserWithPendingLoading && (
              <div>
                <h3 className="text-lg font-medium">
                  정보를 불러오는 중입니다.
                </h3>
              </div>
            ))}
          {!isLoading &&
            (currentPlan ? (
              <>
                <div>
                  <h3 className="text-lg font-medium">
                    {currentPlan.is_active ? "Team 플랜" : "플랜 없음"}
                  </h3>
                  <p className="text-muted-foreground">
                    {numberCurrentUserWithPendingLoading
                      ? ""
                      : numberCurrentUserWithPending}
                    명/{currentPlan.max_members}명
                  </p>
                </div>
                <Badge variant="outline">
                  이용 기간 {leftDays(currentPlan.expired_at.toString())}일 남음
                </Badge>
              </>
            ) : (
              <div>
                <h3 className="text-lg font-medium">플랜 없음</h3>
              </div>
            ))}
        </div>
        {!teamInfoLoading && teamInfo && currentPlan && (
          <div className="mt-4 text-sm text-muted-foreground">
            <ul className="list-disc pl-4 space-y-1">
              <li>블록체인을 이용한 전자서명</li>
              <li>
                연동 GitHub Repository 수: {teamInfo.linked_repo_num}/&infin;
              </li>
              <li>프로젝트 수: {teamInfo.project_num}/&infin;</li>
              <li>버킷 수: {teamInfo.bucket_num}/&infin;</li>
              <li>노트 수: {teamInfo.note_num}/&infin;</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentHistory() {
  const { paymentHistory, isLoading, error } = usePaymentHistory();
  return (
    <>
      <div id="onborda-step4" className="bg-card rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">결제 이력</h2>
        </div>
        <div className="mt-6 space-y-4">
          {paymentHistory && paymentHistory.length > 0 ? (
            paymentHistory
              .filter(
                (payment: PaymentHistoryType) => payment.status === "DONE"
              )
              .map((payment: PaymentHistoryType) => {
                const purchaseDate = new Date(payment.purchase_datetime);
                console.log(purchaseDate); // This will help you verify the conversion
                return (
                  <div
                    className="flex items-center justify-between"
                    key={payment.id}
                  >
                    <div>
                      <p className="font-medium">
                        {purchaseDate.toLocaleDateString("ko-KR")}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {payment.notes}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {payment.total_amount.toLocaleString("ko-KR")}원
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {payment.payment_method}
                      </p>
                    </div>
                  </div>
                );
              })
          ) : (
            <p>결제 이력이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}

export { PaymentForm };
