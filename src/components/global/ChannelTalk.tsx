"use client";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import useUser from "@/hooks/fetch/useUser";

// ChannelService 스크립트 로드
ChannelService.loadScript();

// ChannelTalk 컴포넌트 정의
const ChannelTalk: React.FC = () => {
	const { userInfo, error, isLoading } = useUser();

	useEffect(() => {
		// Supabase 클라이언트 생성
		const supabase = createClient();

		// 현재 사용자 정보를 가져와 ChannelTalk 부트 함수 실행
		const bootChannelTalk = async () => {
			try {
				const {
					data: { user },
				} = await supabase.auth.getUser();

				if (!user) {
					console.error("User not found");
					return;
				}

				// 사용자 이름 생성
				const userName = userInfo?.last_name || userInfo?.first_name ? `${userInfo.last_name}${userInfo.first_name} ${user.email}` : user.email || null;

				// ChannelTalk 부트
				ChannelService.boot({
					pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string,
					memberId: user.id,
					profile: {
						name: userName,
						email: user.email || null,
						mobileNumber: user.phone || null,
					},
				});
			} catch (error) {
				console.error("Error booting ChannelTalk:", error);
			}
		};

		// 로딩이 완료되면 ChannelTalk 부트
		if (!isLoading) {
			bootChannelTalk();
		}

		// 컴포넌트 언마운트 시 ChannelTalk 종료
		return () => {
			ChannelService.shutdown();
		};
	}, [isLoading, userInfo]);

	// 컴포넌트는 UI를 렌더링하지 않음
	return null;
};

export default ChannelTalk;
