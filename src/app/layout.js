import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import cn from "@/utils/cn";
import { SimulatedDarkModeProvider } from "@/utils/contexts/SimulatedDarkModeDetection";
import Script from 'next/script';

const sg = localFont({
	src: "./fonts/sg.woff2",
	variable: "--font-sg",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "Hacktoberfest 2024 - CBIT Open Source Community",
	description:
		"Dive into the world of open source with CBIT Open Source Community",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "./Lightmode.ico",
				href: "./Lightmode.ico",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "./DarkMode.ico",
				href: "./DarkMode.ico",
			},
		],
	},
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ||
			"https://hfest-2024-testing.vercel.app/"
	),
};

export default function RootLayout({ children }) {
	const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

	return (
		<html lang="en">
			<head>
				{/* Google Analytics */}
				{GA_TRACKING_ID && (
					<>
						<Script
							src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
							strategy="afterInteractive"
						/>
						<Script id="google-analytics" strategy="afterInteractive">
							{`
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${GA_TRACKING_ID}', {
									page_path: window.location.pathname,
								});
							`}
						</Script>
					</>
				)}
			</head>
			<body
				className={cn(
					`${sg.variable} ${geistMono.variable}`,
					"antialiased text-darkgrey bg-beige",
					"min-h-screen md:grid md:grid-rows-[auto,1fr,auto]"
				)}
			>
				<SimulatedDarkModeProvider>
					<Navbar />
					{children}
					<Footer />
				</SimulatedDarkModeProvider>
			</body>
		</html>
	);
}
