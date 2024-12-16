import { Tour } from "onborda/src/types";
import { Button } from "@/components/ui/button";

export const steps: Tour[] = [
  {
    tour: "team-onboarding",
    steps: [
      {
        icon: <>👋</>,
        title: "연구실록 가입을 환영합니다",
        content: <>팀을 만들고 연구실록을 시작하세요!</>,
        selector: "#onborda-step1",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "팀 생성 버튼",
        content: (
          <>
            팀 생성 버튼을 클릭하여 팀을 만들어보세요.
            <br />
            <i>* 지금은 다음 버튼을 눌러서 진행하세요.</i>
          </>
        ),
        selector: "#onborda-step2",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🎩</>,
        title: "팀 생성 화면",
        content: <>팀 정보를 입력하고 팀을 생성하세요.</>,
        selector: "#onborda-step3",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🌀</>,
        title: "팀 이름",
        content: (
          <>
            팀 이름을 입력하세요.
            <br />
            <i>* 팀 이름은 처음 설정하면 수정하기 어렵습니다.</i>
          </>
        ),
        selector: "#onborda-step4",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "팀 생성 버튼",
        content: <>버튼을 클릭하면 팀이 생성됩니다.</>,
        selector: "#onborda-step5",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "팀 이름 확인",
        content: (
          <>
            팀이 생성되었습니다.{" "}
            <i>
              <br />* 소속된 팀 없다면 처음부터 다시 해주세요.
            </i>
          </>
        ),
        selector: "#onborda-step6",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
        nextRoute: "/pricing",
      },
      {
        icon: <>⭐️</>,
        title: "팀 플랜",
        content: (
          <>
            연구실록을 이용하기 위해서는 팀 플랜이 있어야 합니다. 팀 플랜에 대한
            구체적인 사항은 문의하기를 통해 문의해주세요.
          </>
        ),
        selector: "#onborda-step7",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
        prevRoute: "/setting/team",
      },
    ],
  },
  {
    tour: "setting-account",
    steps: [
      {
        icon: <>👋</>,
        title: "계정 설정",
        content: (
          <>
            계정 설정 페이지입니다. 사용자의 기본 설정을 확인 및 수정할 수
            있습니다.
          </>
        ),
        selector: "#onborda-step1",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "이름 설정",
        content: (
          <>
            사용자의 성, 이름을 작성합니다.
            <br />
            <i>* 성, 이름 중 하나는 꼭 있어야합니다.</i>
          </>
        ),
        selector: "#onborda-step2",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🎩</>,
        title: "이메일 설정",
        content: (
          <>
            계정 아이디 겸 이메일입니다.
            <br />
            <i>* 계정 생성 이후 수정할 수 없습니다.</i>
          </>
        ),
        selector: "#onborda-step3",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🌀</>,
        title: "비밀번호 초기화 버튼",
        content: <>클릭하여 비밀번호를 초기화할 수 있습니다.</>,
        selector: "#onborda-step4",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "설정 업데이트 버튼",
        content: <>클릭하여 작성한 내용으로 설정이 업데이트됩니다.</>,
        selector: "#onborda-step5",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "계정 탈퇴 버튼",
        content: (
          <>
            클릭하여 계정을 삭제합니다. 계정과 계정에서 생성한 모든 데이터를
            영구적으로 삭제합니다.
            <i>
              <br />* 이 작업은 되돌릴 수 없거나, 복구에 많은 비용이 발생합니다.
            </i>
          </>
        ),
        selector: "#onborda-step6",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
    ],
  },
  {
    tour: "setting-team", // 팀 생성 랜딩페이지 추가 시 사용
    steps: [
      {
        icon: <>👋</>,
        title: "팀 설정 페이지",
        content: (
          <>
            연구실록 팀 설정 페이지입니다. 연구실록 팀과 관련된 기능을 이용할 수
            있습니다.
          </>
        ),
        selector: "#onborda-step1",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
    ],
  },
  {
    tour: "setting-note",
    steps: [
      {
        icon: <>👋</>,
        title: "노트 설정",
        content: (
          <>
            노트 설정 페이지입니다. 연구실록 노트 작성에 관련된 설정을 수정할 수
            있습니다.
          </>
        ),
        selector: "#onborda-step1",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "서명 설정",
        content: (
          <>사용자의 서명 설정입니다. 노트 서명과 관련된 기능이 있습니다.</>
        ),
        selector: "#onborda-step2",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🎩</>,
        title: "서명 입력",
        content: (
          <>
            사용자의 서명을 입력하는 칸입니다. 서명을 입력하면 이후 생성하는
            노트에 서명이 자동으로 입력됩니다.
            <br />
            <i>* 서명이 없을 시 사용자의 계정(이메일)으로 대신합니다.</i>
          </>
        ),
        selector: "#onborda-step3",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🌀</>,
        title: "서명 초기화 버튼",
        content: <>클릭하여 서명을 초기화할 수 있습니다.</>,
        selector: "#onborda-step4",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "서명 저장 버튼",
        content: <>클릭하여 작성한 내용으로 서명이 저장됩니다.</>,
        selector: "#onborda-step5",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "서명 파일 업로드 창",
        content: (
          <>
            사용자의 서명 파일을 업로드할 수 있는 창입니다. 업로드한 서명을
            미리보기 할 수 있습니다.
            <i>
              <br />* 서명 파일 권장사항
              <br />- 해상도: 500 x 200
              <br />- 파일 형식: PNG, JPEG, GIF
              <br />- 파일 크기: 1MB 이하
            </i>
          </>
        ),
        selector: "#onborda-step6",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
    ],
  },
  {
    tour: "setting-link",
    steps: [
      {
        icon: <>👋</>,
        title: "연결 설정",
        content: (
          <>
            계정 연결 페이지입니다. 연구실록 외부 계정과 연결 관련된 설정입니다.
          </>
        ),
        selector: "#onborda-step1",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "연결한 계정",
        content: (
          <>
            계정이 연결된 곳을 확인합니다.
            <br />
            서비스 제공자: 이메일, 구글, 네이버, 카카오
            <br />
            <i>* 네이버, 카카오 연결은 준비중입니다.</i>
          </>
        ),
        selector: "#onborda-step2",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🎩</>,
        title: "GitHub 연결 설정",
        content: <>GitHub 연결 설정 칸입니다.</>,
        selector: "#onborda-step3",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🌀</>,
        title: "GitHub 계정",
        content: (
          <>
            연결된 GitHub를 확인하는 칸입니다. 연결된 GitHub 계정이 없을시
            &quot;GitHub 로그인이 필요합니다.&quot; 라고 표시됩니다.
          </>
        ),
        selector: "#onborda-step4",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "GitHub 연결 버튼",
        content: <>클릭하여 GitHub 계정과 연결합니다.</>,
        selector: "#onborda-step5",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "토큰 다시 받아오기 버튼",
        content: (
          <>
            클릭하여 GitHub 계정 연결 토큰을 다시 받아옵니다.
            <br />
            <i>
              * 다음과 같은 상황에서 일어날 수 있습니다.
              <br />
              - GitHub 계정 연동을 해제하고 GitHub 상에서는 연구실록을 삭제하지
              않은 경우
              <br />- GitHub 계정 연동을 해제하고 GitHub 상에서 연구실록을
              삭제한 경우
            </i>
          </>
        ),
        selector: "#onborda-step6",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
    ],
  },
  {
    tour: "setting-payment",
    steps: [
      {
        icon: <>👋</>,
        title: "결제 설정",
        content: (
          <>
            결제 설정 페이지입니다. 연구실록 결제 및 이력을 확인할 수 있습니다.
          </>
        ),
        selector: "#onborda-step1",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "팀 플랜 시작하기 버튼",
        content: <>클릭하여 팀 플랜 설정 페이지로 이동합니다.</>,
        selector: "#onborda-step2",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🎩</>,
        title: "현재 플랜",
        content: (
          <>
            현재 팀의 플랜 정보를 확인합니다.
            <br />
            <i>
              * 다음과 같은 정보가 표시됩니다.
              <br />
              - 최대 인원
              <br />
              - 사용자 수
              <br />- 남은 이용 기간
            </i>
          </>
        ),
        selector: "#onborda-step3",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🌀</>,
        title: "결제 이력",
        content: (
          <>
            현재 팀의 결제 이력을 확인합니다.
            <br />
            <i>
              * 자세한 결제 이력 및 영수증이 필요하신 경우 문의하기를 통해
              문의해주시기 바랍니다.
            </i>
          </>
        ),
        selector: "#onborda-step4",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
    ],
  },
  {
    tour: "dashboard-project",
    steps: [
      {
        icon: <>👋</>,
        title: "탐색 경로",
        content: (
          <>
            대시보드 탐색 경로 입니다. 클릭하여 해당 경로로 접근할 수 있습니다.
          </>
        ),
        selector: "#onborda-step1",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👋</>,
        title: "내 프로젝트",
        content: (
          <>프로젝트 목록 페이지입니다. 팀 전체 프로젝트를 볼 수 있습니다.</>
        ),
        selector: "#onborda-step2",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "새 프로젝트 버튼",
        content: <>새 프로젝트 버튼을 클릭하여 프로젝트를 만들어보세요.</>,
        selector: "#onborda-step3",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🎩</>,
        title: "프로젝트 목록",
        content: (
          <>
            프로젝트들이 나열됩니다. 프로젝트 이름, 연구책임자, 과제번호, 연구
            시작일, 연구 종료일, 관리 버튼이 표시됩니다.
          </>
        ),
        selector: "#onborda-step4",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🌀</>,
        title: "프로젝트 이름",
        content: <>프로젝트 생성시 입력한 이름이 표시됩니다.</>,
        selector: "#onborda-step5",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "연구책임자",
        content: (
          <>
            프로젝트 생성시 팀원 중에 선택하거나 텍스트로 자유롭게 적을 수
            있습니다.
          </>
        ),
        selector: "#onborda-step6",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "과제번호",
        content: (
          <>
            프로젝트 생성시 입력한 과제번호가 표시됩니다. 영문과 숫자 및
            특수문자만 입력 가능합니다.
          </>
        ),
        selector: "#onborda-step7",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "연구 시작일",
        content: (
          <>
            프로젝트 생성시 입력한 연구 시작일이 표시됩니다. 2025-01-01 형식으로
            확인할 수 있습니다.
          </>
        ),
        selector: "#onborda-step8",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "연구 종료일",
        content: (
          <>
            프로젝트 생성시 입력한 연구 종료일이 표시됩니다. 2025-01-01 형식으로
            확인할 수 있습니다.
          </>
        ),
        selector: "#onborda-step9",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "관리 버튼",
        content: (
          <>
            프로젝트 관리 버튼이 배치되는 칸입니다. 프로젝트 관리 버튼을
            클릭하여 프로젝트 내부의 내 버킷 페이지로 이동합니다. 아래와 같은
            버튼 형식으로 표시됩니다.
            <Button className="w-10/12 mt-2 mx-5">보기/관리</Button>
          </>
        ),
        selector: "#onborda-step10",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "프로젝트 다운로드 버튼",
        content: (
          <>
            프로젝트 다운로드 버튼을 클릭하여 다운로드 모드로 전환합니다.
            다운로드 모드 전환시 다른 기능은 비활성화 됩니다.
          </>
        ),
        selector: "#onborda-step11",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
    ],
  },
  {
    tour: "dashboard-bucket",
    steps: [
      {
        icon: <>👋</>,
        title: "탐색 경로",
        content: (
          <>
            대시보드 탐색 경로 입니다. 클릭하여 해당 경로로 접근할 수 있습니다.
          </>
        ),
        selector: "#onborda-step1",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👋</>,
        title: "내 버킷",
        content: (
          <>
            버킷 목록 페이지입니다. 해당 프로젝트의 전체 버킷을 볼 수 있습니다.
          </>
        ),
        selector: "#onborda-step2",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "프로젝트 설정 버튼",
        content: (
          <>
            프로젝트 설정 버튼을 클릭하여 해당 프로젝트의 정보를 수정하세요. 팀
            리더가 아닌 경우 해당 버튼은 비활성화 됩니다.
          </>
        ),
        selector: "#onborda-step3",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "새 버킷 버튼",
        content: <>새 버킷 버튼을 클릭하여 버킷을 만들어보세요.</>,
        selector: "#onborda-step4",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🎩</>,
        title: "버킷 목록",
        content: (
          <>
            버킷들이 나열됩니다. 버킷 이름, 상태, 버킷 매니저, GitHub 연동, 관리
            버튼이 표시됩니다.
          </>
        ),
        selector: "#onborda-step5",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🌀</>,
        title: "버킷 이름",
        content: <> 버킷 생성시 입력한 이름이 표시됩니다.</>,
        selector: "#onborda-step6",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "상태",
        content: <>버킷 상태입니다.</>,
        selector: "#onborda-step7",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👉</>,
        title: "버킷 매니저",
        content: <>버킷 생성시 팀원 중에 선택할 수 있습니다.</>,
        selector: "#onborda-step8",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "GitHub 연동",
        content: (
          <>
            버킷의 GitHub Repository 연동 여부를 확인할 수 있습니다. 버킷 생성
            이후 버킷 설정에서 설정할 수 있습니다.
          </>
        ),
        selector: "#onborda-step9",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "관리 버튼",
        content: (
          <>
            버킷 관리 버튼이 배치되는 칸입니다. 버킷 관리 버튼을 클릭하여 버킷
            내부의 내 노트 페이지로 이동합니다. 아래와 같은 버튼 형식으로
            표시됩니다.
            <Button className="w-10/12 mt-2 mx-5">보기/관리</Button>
          </>
        ),
        selector: "#onborda-step10",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "버킷 다운로드 버튼",
        content: (
          <>
            버킷 다운로드 버튼을 클릭하여 다운로드 모드로 전환합니다. 다운로드
            모드 전환시 다른 기능은 비활성화 됩니다.
          </>
        ),
        selector: "#onborda-step11",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
    ],
  },
  {
    tour: "dashboard-note",
    steps: [
      {
        icon: <>👋</>,
        title: "탐색 경로",
        content: (
          <>
            대시보드 탐색 경로 입니다. 클릭하여 해당 경로로 접근할 수 있습니다.
          </>
        ),
        selector: "#onborda-step1",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>👋</>,
        title: "내 노트",
        content: (
          <>노트 목록 페이지입니다. 해당 버킷의 전체 노트를 볼 수 있습니다.</>
        ),
        selector: "#onborda-step2",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🎩</>,
        title: "노트 목록",
        content: (
          <>
            노트들이 나열됩니다. 노트 이름, 생성일시, 작성자, 삭제 버튼, 보기
            버튼이 표시됩니다. 팀 리더가 아닌 경우 삭제 버튼은 비활성화 됩니다.
          </>
        ),
        selector: "#onborda-step3",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "노트 생성 버튼",
        content: <>노트 생성 버튼을 클릭하여 노트를 만들어보세요.</>,
        selector: "#onborda-step4",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "노트 다운로드 버튼",
        content: (
          <>
            노트 다운로드 버튼을 클릭하여 다운로드 모드로 전환합니다. 다운로드
            모드 전환시 다른 기능은 비활성화 됩니다.
          </>
        ),
        selector: "#onborda-step5",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "버킷 설정 버튼",
        content: (
          <>
            버킷 설정 버튼을 클릭하여 해당 버킷의 정보를 수정하세요. GitHub
            Repository 등록이 필요한 경우 이 버튼을 이용해주세요. 팀 리더가 아닌
            경우 해당 버튼은 비활성화 됩니다.
          </>
        ),
        selector: "#onborda-step6",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "노트 조회 날짜",
        content: (
          <>
            조회할 날짜의 범위를 선택해 노트를 조회할 수 있습니다. 기본값은 전체
            범위입니다. 우측에 있는 리셋 버튼을 클릭하여 기본값으로 돌아갈 수
            있습니다.
          </>
        ),
        selector: "#onborda-step7",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
    ],
  },
  {
    tour: "dashboard-noteDetail",
    steps: [
      {
        icon: <>👋</>,
        title: "탐색 경로",
        content: (
          <>
            대시보드 탐색 경로 입니다. 클릭하여 해당 경로로 접근할 수 있습니다.
          </>
        ),
        selector: "#onborda-step1",
        side: "bottom",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      // {
      //   icon: <>👋</>,
      //   title: "노트 상세보기",
      //   content: (
      //     <>
      //       노트 상세보기 페이지입니다. 해당 노트의 상세한 정보를 볼 수
      //       있습니다.
      //     </>
      //   ),
      //   selector: "#onborda-step2",
      //   side: "bottom",
      //   showControls: true,
      //   pointerPadding: 20,
      //   pointerRadius: 24,
      // },
      {
        icon: <>🎩</>,
        title: "노트 PDF 뷰어",
        content: (
          <>
            PDF 파일인 노트를 뷰어로 확인할 수 있습니다. 뷰어에서는 페이지 이동,
            확대, 전체화면, 인쇄 기능 등을 사용할 수 있습니다.
          </>
        ),
        selector: "#onborda-step3",
        side: "right",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "노트 이름",
        content: (
          <>
            노트 생성할 때 입력된 이름입니다. 사용자가 임의로 수정할 수
            없습니다.
          </>
        ),
        selector: "#onborda-step4",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "노트 작성자",
        content: (
          <>노트 작성자의 이름입니다. 사용자가 임의로 수정할 수 없습니다.</>
        ),
        selector: "#onborda-step5",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>🪄</>,
        title: "노트 프로젝트",
        content: <>노트가 소속된 프로젝트 이름입니다.</>,
        selector: "#onborda-step6",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "노트 버킷",
        content: <>노트가 소속된 버킷 이름입니다.</>,
        selector: "#onborda-step7",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "노트 고유 ID",
        content: (
          <>
            노트 생성시 자동으로 생성된 고유 ID입니다. UUID 형식으로 생성됩니다.
          </>
        ),
        selector: "#onborda-step8",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "블록체인 기록 ID",
        content: (
          <>
            노트가 생성될 때 작성되는 블록체인 기록 ID입니다. 블록체인 기록 ID는
            시점인증에 이용됩니다.
          </>
        ),
        selector: "#onborda-step9",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "노트 다운로드 버튼",
        content: (
          <>
            노트 다운로드 버튼을 클릭하여 해당 노트를 다운로드할 수 있습니다.
            &quot;Report_[노트 고유 ID].pdf&quot; 형식으로 다운로드됩니다.
          </>
        ),
        selector: "#onborda-step10",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
      {
        icon: <>⭐️</>,
        title: "노트 삭제 버튼",
        content: <>노트 삭제 버튼을 클릭하여 해당 노트를 삭제합니다.</>,
        selector: "#onborda-step11",
        side: "left",
        showControls: true,
        pointerPadding: 20,
        pointerRadius: 24,
      },
    ],
  },
];
