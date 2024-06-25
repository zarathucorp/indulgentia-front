/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ["ko", "ja"],
		defaultLocale: "ko",
	},
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "static.toss.im",
				port: "",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
