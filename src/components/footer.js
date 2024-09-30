import Image from "next/image";
import React from "react";
import {
	FaXTwitter,
	FaSquareFacebook,
	FaInstagram,
	FaLinkedin,
} from "react-icons/fa6";

import Logo from "./assets/logo_horizontal_beige.png";
import cn from "@/utils/cn";
import Link from "next/link";

export default function Footer() {
	return (
		<footer>
			<div className="bg-darkgreen text-base">
				<div
					className={cn(
						"container mx-auto px-6 py-8",
						"flex flex-col gap-8 justify-between items-center"
					)}
				>
					<div className="flex flex-col-reverse gap-8 lg:flex-row w-full py-6">
						<div className="flex gap-4 flex-col flex-[1]">
							<div>
								<div className="flex gap-4">
									<Image
										src={Logo}
										width={200}
										className="select-none"
										alt="CBIT Hacktoberfest Hackathon 2024"
									/>
								</div>
								<p className="text-xl font-bold pt-4 text-beige">
									Hacktoberfest 2024
									<br /> CBIT Open Source Community
								</p>
							</div>
							<div>
								<p className="text-beige py-2 text-base">
									Follow us on Social Media for Updates
								</p>
								<div className="flex gap-4">
									<Link
										href="https://www.facebook.com/cbitosc/"
										className={cn(
											"text-4xl text-beige",
											"hover:text-blue-400 transition-colors"
										)}
									>
										<FaSquareFacebook />
									</Link>
									<Link
										href="https://twitter.com/cbitosc/"
										className={cn(
											"text-4xl text-beige",
											" hover:text-pink transition-colors"
										)}
									>
										<FaXTwitter />
									</Link>
									<Link
										href="https://www.instagram.com/cbitosc/"
										className={cn(
											"text-4xl text-beige",
											" hover:text-pink transition-colors"
										)}
									>
										<FaInstagram />
									</Link>
									<Link
										href="https://www.linkedin.com/company/cbitosc/"
										className={cn(
											"text-4xl text-beige",
											" hover:text-blue-500 transition-colors"
										)}
									>
										<FaLinkedin />
									</Link>
								</div>
							</div>
						</div>
						<div className="flex-[2] flex flex-col gap-4 justify-between">
							<div>
								<p className="text-beige text-2xl font-bold">
									<span className="text-pink">&gt;</span> What
									We Do?
								</p>
								<p className="text-beige pl-5 text-lg">
									We're a community dedicated to advancing the
									open source culture. We host{" "}
									<b>hackathons</b>, conduct <b>bootcamps</b>,
									and facilitate workshops to equip students
									with the skills they need to thrive in the
									world of technology.
								</p>
							</div>
							<div>
								<p className="text-beige text-2xl font-bold">
									<span className="text-pink">&gt;</span> Join
									Us on This Journey
								</p>
								<p className="text-beige pl-5 text-lg">
									<b>Hacktoberfest</b> isn't just an event;
									it's a chance to be part of something bigger
									and to make an impact in the tech world. So,
									whether you're a seasoned developer, a
									curious beginner, or simply someone with a
									passion for technology, we invite you to
									join us on this exhilarating journey.
								</p>
							</div>
						</div>
					</div>
					<div className="w-full flex flex-col justify-start items-start gap-4 lg:flex-row lg:justify-between">
						<Link
							href="https://hacktoberfest.com"
							target="_blank"
							className="text-beige/60 border-b-2 border-beige/70 transition-colors text-base hover:text-beige"
						>
							Hacktoberfest ↗
						</Link>
						<Link
							href="https://cbitosc.github.io/"
							target="_blank"
							className="text-beige/60 border-b-2 border-beige/70 transition-colors text-base hover:text-beige"
						>
							CBIT Open Source Community ↗
						</Link>
						<Link
							href="https://cbitosc.github.io/coc/"
							target="_blank"
							className="text-beige/60 border-b-2 border-beige/70 transition-colors text-base hover:text-beige"
						>
							Code of Conduct ↗
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
