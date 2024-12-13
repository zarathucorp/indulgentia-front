import { withSentryConfig } from "@sentry/nextjs";
import removeImports from 'next-remove-imports';

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

const sentryOptions = {
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options
	
	org: "zarathu",
	project: "rndsillog",
	
	// Only print logs for uploading source maps in CI
	silent: !process.env.CI,
	
	// For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
	
	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: true,
	
	// Automatically annotate React components to show their full name in breadcrumbs and session replay
	reactComponentAnnotation: {
	enabled: true,
	},
	
	// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	tunnelRoute: "/monitoring",
	
	// Hides source maps from generated client bundles
	hideSourceMaps: true,
	
	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true,
	
	// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
	// See the following for more information:
	// https://docs.sentry.io/product/crons/
	// https://vercel.com/docs/cron-jobs
	automaticVercelMonitors: true,
	sourcemaps: {
		disable: true
	},
}

const finalConfig = process.env.NODE_ENV === "production" ? withSentryConfig(nextConfig, sentryOptions) : nextConfig;

// 메모리 누수로 인해 sentryOptions를 일시적으로 사용하지 않음
// export default removeImports()(nextConfig);
export default removeImports()(finalConfig);