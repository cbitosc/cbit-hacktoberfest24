"use client";
import React from "react";
import Boxes from "@/components/ui/background-boxes";
import cn from "../utils/cn";
import TypingEffect from "@/app/preptember/TypingEffect";
import Link from "next/link";

export default function HeroMod() {
	return (
		<div
			style={{ backgroundColor: "#183717" }}
			className="h-[90vh] md:h-[100vh] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center"
		>
			<div
				style={{ backgroundColor: "#183717" }}
				className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none"
			/>
			<Boxes />
			<div className="relative z-20 flex flex-col items-center pointer-events-none">
				<div className="flex flex-row items-center justify-center">
					<img
						src="/assets/cosc-green.svg"
						alt="Chfest"
						className="h-[80px] px-3 md:h-[180px] w-auto md:px-5"
					/>
					<img
						src="/assets/chfest.svg"
						alt="Chfest"
						className="h-[80px] px-3 md:h-[180px] w-auto md:px-5"
					/>
				</div>
				<h1 className="md:text-5xl text-4xl text-center text-[#f3f0e0] my-8 font-bold">
					<TypingEffect
						text="CBIT Hacktoberfest Hackathon'24"
						speed={70}
					/>
				</h1>
				<p className="text-center mt-2 text-[#ffb8ff] text-xl">
					{">"} The <span className="text-beige">Biggest</span>{" "}
					Celebration of{" "}
					<span className="text-beige">Open Source!</span>
				</p>
				{/* adding a big button with background #183717 and border #50da4c with border full with stroke 2 */}
				<div className="flex flex-col items-center mt-8 w-[30vh] pointer-events-auto">
					<Link
						href="#timer"
						className={cn(
							"bg-[#183717] border-[#50da4c] border-2 md:h-[7vh] text-[#50da4c]",
							"px-6 py-2 rounded-full mt-8 hover:bg-[#50da4c] hover:text-[#183717]",
							"transition-colors duration-300",
							"flex justify-center items-center"
						)}
					>
						Coming Soon
					</Link>
				</div>
			</div>
		</div>
	);
}
