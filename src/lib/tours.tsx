import { Tour } from "onborda/src/types";

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
];
