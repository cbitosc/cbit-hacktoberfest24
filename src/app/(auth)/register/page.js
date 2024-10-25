"use client";

import React, { useEffect } from "react";
import TypingEffect2 from "@/app/TypingEffect2";
import "../styles/registration.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { MdLockClock } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/contexts/AuthContext";

const page = () => {
	const router = useRouter();
	const { user } = useAuth();
	useEffect(() => {
		if (user) router.push("/teamdetails");
	});
	return (
		<div className="background-gradient flex flex-col items-center justify-center min-h-screen bg-darkgrey px-2 lg:pt-12">
			<div className="w-full max-w-md p-8 space-y-8 glassomorphism rounded-lg shadow text-center">
				<h2 className="font-medium lg:text-md text-beige/60 flex justify-center items-center gap-2">
					<MdLockClock size={36} className="inline-block" />{" "}
					<span className="text-md">Uh, Oh! You are late!</span>
				</h2>

				<div className="text-4xl font-bold text-green">
					<span className="text-deeppink">&gt;</span> Registrations are
					<TypingEffect2 text="closed" speed={70} />
				</div>

				<p className="text-xl text-beige/80">
					We're sorry, but registrations for CBIT Hacktoberfest
					Hackathon 2024 are now closed.
				</p>

				<hr className="border-beige/40" />

				<div className="space-y-4">
					<p className="text-beige text-sm">
						Follow us on social media for the latest updates:
					</p>

					<div className="flex justify-center gap-6">
						<a
							href="https://www.instagram.com/cbitosc"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 text-beige/80 hover:text-rose-500 transition-all duration-300"
							aria-label="Follow us on Instagram"
						>
							<FaInstagram size={28} />
						</a>

						<a
							href="https://linkedin.com/company/cbit-hackathon"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 text-beige/80 hover:text-blue-500 transition-all duration-300"
							aria-label="Follow us on LinkedIn"
						>
							<FaLinkedin size={28} />
						</a>
					</div>

					<button
						className="w-full px-4 py-2 text-darkgreen hover:text-white font-medium bg-green rounded-md hover:bg-deeppink transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-deeppink focus:ring-offset-2"
						onClick={() => router.back()}
					>
						Go Back
					</button>
				</div>
			</div>
		</div>
	);
};

export default page;
