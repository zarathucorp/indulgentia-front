/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ["ko", "ja"],
		defaultLocale: "ko",
	},
	reactStrictMode: false,
	output: "standalone",
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
