"use client";
import { createClient } from "@/utils/supabase/client";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { useEffect } from "react";
ChannelService.loadScript();

import useUser from "@/hooks/fetch/useUser";

export default function ChannelTalk() {
	const { userInfo, error, isLoading } = useUser();

	useEffect(() => {
		const supabase = createClient();

		const getCurrentUserKey = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			ChannelService.boot({
				pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string, // 채널톡 플러그인 키
				memberId: user?.id,
				profile: {
					name: userInfo?.last_name || userInfo?.first_name ? userInfo?.last_name + userInfo?.first_name + " " + user?.email : user?.email || null,
					email: user?.email || null,
					mobileNumber: user?.phone || null,
				},
			});
		};

		{
			!isLoading && getCurrentUserKey();
		}
	}, [isLoading]);

	return null;
}
