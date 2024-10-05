import StackedText from "@/components/StackedText";
import cn from "@/utils/cn";
import Link from "next/link";
import React from "react";
import { FaLeftLong } from "react-icons/fa6";
import LoginForm from "./login";

export default function Register() {
	return (
		<main className="flex w-full min-h-screen justify-center items-center bg-darkgrey">
			<div>
				<section id="login">
					<LoginForm />
				</section>

				{/* Correct Link for Back to Home */}
				{/* <Link
					href="/"
					className={cn(
						"text-beige hover:text-darkgreen mt-8 underline underline-offset-2",
						"bg-darkgrey hover:bg-lightgreen w-fit px-4 py-2 rounded-lg",
						"flex items-center gap-4 justify-center",
						"transition-all duration-300 ease-in-out"
					)}
				>
					<FaLeftLong /> Back to home
				</Link> */}
			</div>
		</main>
	);
}

