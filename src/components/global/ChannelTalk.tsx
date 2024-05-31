"use client";
import { createClient } from "@/utils/supabase/client";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { useEffect } from "react";
ChannelService.loadScript();

export default function ChannelTalk() {
	useEffect(() => {
		const supabase = createClient();
		const getCurrentUserKey = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			ChannelService.boot({
				pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string, // fill your plugin key
				memberId: user?.id,
				profile: {
					name: user?.email || null, // 의도적으로 email로 넣었습니다 => 추후 수정 필요; 채널톡 유료플랜 안 쓰면 이메일 못 보는데, 이름만 들어갈 경우에 회원 식별이 불가합니다.
					email: user?.email || null,
					mobileNumber: user?.phone || null,
				},
			});
		};
		getCurrentUserKey();
	}, []);

	return null;
}
