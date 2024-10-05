import cn from "@/utils/cn";
import Image from "next/image";
import React from "react";

import NotFoundASCII from "./assets/ascii-404.41047a36.svg";
import "./not-found.css";
import Link from "next/link";
import StackedText from "@/components/StackedText";

export const metadata = {
	title: "404 | CBIT Hacktoberfest 2024",
};

export default function NotFound() {
	return (
		<main
			className={cn(
				"w-full min-h-[60vh]",
				"flex justify-center items-center",
				"bg-darkgrey text-lightgreen",
				"pt-14"
			)}
		>
			<div className="flex flex-col md:flex-row items-center p-8 gap-4">
				<div className="relative glitch-images">
					<Image
						src={NotFoundASCII}
						alt="Page Not Found"
						width={400}
						height={400}
					/>
					<span>
						<Image
							src={NotFoundASCII}
							alt="Page Not Found"
							className="absolute top-0"
							width={400}
							height={400}
						/>
						<Image
							src={NotFoundASCII}
							alt="Page Not Found"
							className="absolute top-0"
							width={400}
							height={400}
						/>
					</span>
				</div>
				<div className="flex flex-col">
					<StackedText text="Uh Oh..." fontSize="72px" />
					<p>
						The page you are looking for might have been moved or
						removed permanently.
					</p>
					<Link
						href="/"
						className={cn(
							"px-8 py-3 bg-green mt-8 max-w-fit text-beige text-center",
							"hover:bg-deeppink transition-colors duration-500 ease-in-out",
							"rounded-md"
						)}
					>
						Go back to home
					</Link>
				</div>
			</div>
		</main>
	);
}
