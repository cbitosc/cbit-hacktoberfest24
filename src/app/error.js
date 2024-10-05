"use client"; // Error boundaries must be Client Components

import cn from "@/utils/cn";
import Image from "next/image";
import NotFoundASCII from "./assets/ascii-404.41047a36.svg";
import StackedText from "@/components/StackedText";

import "./not-found.css";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.clear();
	});
	return (
		<main
			className={cn(
				"w-full min-h-[60vh]",
				"flex justify-center items-center",
				"bg-darkgrey text-lightgreen",
				"pt-14"
			)}
		>
			<div className="flex flex-col md:flex-row items-center p-12 gap-4">
				<div className="relative glitch-images flex-1 m-8">
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
				<div className="flex flex-col flex-1 md:m-8">
					<StackedText text="Uh Oh..." fontSize="72px" />
					<p>Looks like we ran into some trouble.</p>
					<div className="flex gap-2 flex-wrap">
						<button
							onClick={reset}
							className={cn(
								"px-8 py-3 mt-8 md:max-w-fit font-medium",
								"bg-green text-darkgreen text-center",
								"hover:bg-deeppink hover:text-beige transition-colors duration-500 ease-in-out",
								"rounded-md"
							)}
						>
							Try Again
						</button>
						<Link
							href="/"
							className={cn(
								"px-8 py-3 mt-8 md:max-w-fit font-medium",
								"bg-green text-darkgreen text-center",
								"hover:bg-deeppink hover:text-beige transition-colors duration-500 ease-in-out",
								"rounded-md"
							)}
						>
							Back to home
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
