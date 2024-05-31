"use client";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";

ChannelService.loadScript();

// 나중에 유저 정보 받아서 입력해줘야 함.
// 참고: https://developers.channel.io/reference/glossary-kr#%EB%A9%A4%EB%B2%84-%EC%9C%A0%EC%A0%80
// 참고: https://developers.channel.io/reference/web-quickstart-kr

export default function ChannelTalk() {
	ChannelService.boot({
		pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string, // fill your plugin key
	});
	return null;
}
