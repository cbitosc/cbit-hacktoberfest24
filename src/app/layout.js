import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import cn from "@/utils/cn";
import { SimulatedDarkModeProvider } from "@/utils/contexts/SimulatedDarkModeDetection";
import Script from "next/script";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/utils/contexts/AuthContext";

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
		"Dive into the world of open source with CBIT Open Source Community. CBIT Hacktoberfest 2024 is one of the biggest open-source events of the year on the 26th and 27th of October for an exhilarating 24-hour virtual hackathon, celebrating open source, teamwork and creativity.",
	keywords: [
		"hacktoberfest",
		"cbit",
		"open source",
		"community",
		"preptember",
		"git",
		"github",
		"hackathon",
		"programming",
		"development",
		"web development",
		"software development",
		"cbit",
		"chaitanya bharathi institute of technology",
		"hyderabad",
		"telangana",
		"india",
		"college",
		"hacktoberfest 2024",
		"cosc",
	],
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/LightMode.png",
				href: "/LightMode.png",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/DarkMode.png",
				href: "/DarkMode.png",
			},
		],
	},
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ||
			"https://cbit-hacktoberfest24.vercel.app/"
	),
};

export default function RootLayout({ children }) {
	const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				{/* Google Analytics */}
				{GA_TRACKING_ID && (
					<>
						<Script
							src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
							strategy="afterInteractive"
						/>
						<Script
							id="google-analytics"
							strategy="afterInteractive"
						>
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
					"min-h-screen md:grid md:grid-rows-[auto,1fr,auto] relative"
				)}
				suppressHydrationWarning={true}
			>
				<SimulatedDarkModeProvider>
					<AuthProvider>
						<Navbar />
						{children}
						<Footer />
					</AuthProvider>
				</SimulatedDarkModeProvider>
				<Toaster position="top-center" reverseOrder={false} />
			</body>
		</html>
	);
}
