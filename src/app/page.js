import About from "@/components/about";
import "remixicon/fonts/remixicon.css";
import Sponsor from "@/components/Sponsor";
import dynamic from "next/dynamic";
import RootLayoutClient from "@/components/RootLayoutClient";
import HeroMod from "./HeroMod";
import TimelineOld from "./TimelineOld";
import Mentors from "@/components/mentors";
import ContactUs from "@/components/contactUs";
import Preptember from "@/components/preptember";
import { ChatProvider } from "@/components/chatcontext";

const Timer = dynamic(() => import("@/components/Timer"), { ssr: false });

export default function Home() {
	return (
		<ChatProvider>
			<div>
				<RootLayoutClient>
					<section id="hero">
						<HeroMod />
					</section>
					<div className="lg:hidden w-full h-fit overflow-hidden flex flex-col items-end">
						<svg
							className="flex h-fit bg-darkgreen flex-col items-end justify-end"
							width="100%"
							height="203"
							viewBox="0 0 1130 203"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M734 30C739.94 30 745.88 30 752 30C752 35.28 752 40.56 752 46C765.2 46 778.4 46 792 46C792 59.2 792 72.4 792 86C841.17 86 890.34 86 941 86C941 110.09 941 134.18 941 159C971.03 159 1001.06 159 1032 159C1032 124.02 1032 89.04 1032 53C1064.34 53 1096.68 53 1130 53C1130 102.5 1130 152 1130 203C757.1 203 384.2 203 0 203C0 187.82 0 172.64 0 157C57.75 157 115.5 157 175 157C175 144.46 175 131.92 175 119C264.76 119 354.52 119 447 119C447 92.6 447 66.2 447 39C506.07 39 565.14 39 626 39C626 65.4 626 91.8 626 119C680.45 119 734.9 119 791 119C791 108.11 791 97.22 791 86C777.8 86 764.6 86 751 86C751 72.8 751 59.6 751 46C745.39 46 739.78 46 734 46C734 40.72 734 35.44 734 30Z"
								fill="#50DA4C"
							/>
							<path
								d="M447 119C505.74 119 564.48 119 625 119C625 146.72 625 174.44 625 203C566.26 203 507.52 203 447 203C447 175.28 447 147.56 447 119Z"
								fill="#183717"
							/>
							<path
								d="M447 39C506.07 39 565.14 39 626 39C626 93.12 626 147.24 626 203C625.67 203 625.34 203 625 203C625 175.28 625 147.56 625 119C566.26 119 507.52 119 447 119C447 92.6 447 66.2 447 39Z"
								fill="#50DA4C"
							/>
							<path
								d="M734 30C739.94 30 745.88 30 752 30C752 35.28 752 40.56 752 46C765.2 46 778.4 46 792 46C792 59.2 792 72.4 792 86C841.17 86 890.34 86 941 86C941 86.33 941 86.66 941 87C891.83 87 842.66 87 792 87C792 97.56 792 108.12 792 119C791.67 119 791.34 119 791 119C791 108.11 791 97.22 791 86C777.8 86 764.6 86 751 86C751 72.8 751 59.6 751 46C745.39 46 739.78 46 734 46C734 40.72 734 35.44 734 30Z"
								fill="#50DA4C"
							/>
							<path
								d="M999 18C1010.22 18 1021.44 18 1033 18C1033 29.22 1033 40.44 1033 52C1021.78 52 1010.56 52 999 52C999 40.78 999 29.56 999 18Z"
								fill="#50DA4C"
							/>
							<path
								d="M734 30C739.94 30 745.88 30 752 30C752 48.48 752 66.96 752 86C751.67 86 751.34 86 751 86C751 72.8 751 59.6 751 46C745.39 46 739.78 46 734 46C734 40.72 734 35.44 734 30Z"
								fill="#50DA4C"
							/>
							<path
								d="M1033 0C1038.94 0 1044.88 0 1051 0C1051 5.94 1051 11.88 1051 18C1045.06 18 1039.12 18 1033 18C1033 12.06 1033 6.12 1033 0Z"
								fill="#50DA4C"
							/>
							<path
								d="M941 69C946.61 69 952.22 69 958 69C958 74.61 958 80.22 958 86C952.39 86 946.78 86 941 86C941 80.39 941 74.78 941 69Z"
								fill="#50DA4C"
							/>
							<path
								d="M734 30C739.94 30 745.88 30 752 30C752 48.48 752 66.96 752 86C751.67 86 751.34 86 751 86C751 67.85 751 49.7 751 31C746.38 31.33 741.76 31.66 737 32C735.649 34.7018 735.661 37.1181 735.438 40.125C735.354 41.2207 735.27 42.3164 735.184 43.4453C735.123 44.2884 735.062 45.1314 735 46C734.67 46 734.34 46 734 46C734 40.72 734 35.44 734 30Z"
								fill="#50DA4C"
							/>
							<path
								d="M734 30C734.99 30 735.98 30 737 30C736.34 35.28 735.68 40.56 735 46C734.67 46 734.34 46 734 46C734 40.72 734 35.44 734 30Z"
								fill="#50DA4C"
							/>
						</svg>
					</div>
					<section id="about">
						<About />
					</section>

					<section id="timer">
						<Timer launchDate="2024-10-26T16:00:00" />
					</section>
					<div className=" hidden  w-full h-fit overflow-hidden lg:flex flex-col items-end">
						<svg
							className="dg-green-sv-bg flex h-fit bg-darkgreen flex-col items-end justify-end"
							width="100%"
							height="110"
							viewBox="0 0 1041 110"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M182 0H250V52H365V31H492V52V80H628V61V31H836V61H970V31H1041V80V110H970H0V80H182V52V0ZM970 31H836V2H970V31Z"
								fill="#F3F0E0"
							/>
						</svg>
					</div>

					<section id="preptember">
						<Preptember />
					</section>

					<div className="bg-darkgrey w-full h-fit  flex flex-col items-end">
						<svg
							className="bg-darkgrey flex h-fit  flex-col items-end justify-end"
							width="100%"
							viewBox="0 0 1386 230"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M140 -0.000976562H0V98.999H140V130H279V46H419V140H558V164H698V99H837V55H977V111H1116V141H1256V57H1395V0H1256H1116H977H837H698H558H419H279L140 -0.000976562Z"
								fill="#F3F0E0"
							/>
						</svg>
					</div>

					<section id="mentors">
						<Mentors />
					</section>
					<div className=" w-full h-fit overflow-hidden flex flex-col items-end">
						<svg
							className="timeline-background flex h-fit  flex-col items-end justify-end"
							width="100%"
							height="230"
							viewBox="0 0 1386 230"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M140 -0.000976562H0V98.999H140V130H279V46H419V140H558V164H698V99H837V55H977V111H1116V141H1256V57H1395V0H1256H1116H977H837H698H558H419H279L140 -0.000976562Z"
								fill="#1C1C1C"
							/>
						</svg>
					</div>
					<section id="timeline">
						<TimelineOld />
					</section>
					<section id="contact">
						<ContactUs />
					</section>
				</RootLayoutClient>
			</div>
		</ChatProvider>
	);
}
