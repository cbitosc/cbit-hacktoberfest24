import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLightbulb, FaLock } from "react-icons/fa6";
import { BiSolidParty } from "react-icons/bi";
import { GoMultiSelect } from "react-icons/go";

import "./timeline-styles.css";
import StackedText from "@/components/StackedText";

export default function Timeline() {
	return (
		<div
			className={cn("w-full bg-beige text-darkgrey", "p-12", "relative")}
		>
			<div className="text-center">
				<StackedText text="Timeline" fontSize="72px" />
			</div>
			<div
				className={cn("w-full py-8", "flex flex-col-reverse gap-y-12")}
			>
				<div className="lg:px-20 lg:flex lg:items-center lg:justify-center">
					<ol
						className={cn(
							"relative border-s border-green border-l-2 lg:border-none",
							"lg:grid lg:grid-cols-2 lg:max-w-[80%]"
						)}
					>
						<div></div>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLightbulb fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									27 September 2024
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Preptember Begins
								</h3>
								<p className="mb-4 text-base font-normal text-zinc-300">
								    Preptember is an event that
									before Hacktoberfest. Preptember,
									like the name suggests, is a preparation
									month for HacktoberFest. It is a great
									way to delve into open source and prep 
									for the upcoming hackathon. The first video 
									explores the first phase of a hackathon.
								</p>
								<Link
									href="/preptember"
									className={cn(
										"inline-flex items-center px-4 py-2",
										"text-sm font-medium",
										"text-beige bg-darkgreen border border-gray-200 rounded-lg",
										"hover:bg-green hover:text-darkgreen transition-colors",
										"focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700"
									)}
								>
									Learn more{" "}
									<svg
										className="w-5 h-5 ms-2 rtl:rotate-180"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 10"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 5h12m0 0L9 1m4 4L9 9"
										/>
									</svg>
								</Link>
							</div>
						</li>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<BiSolidParty fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									29th September 2024 
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Preptember Video 2
								</h3>
								<p className="text-base font-normal text-zinc-300">
									As we delve further into the preptember series,
									we go in depth into the tech stacks for 
									frontend development.


								</p>
							</div>
						</li>
						<div></div>
						<div></div>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<GoMultiSelect fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									2nd October 2024 
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Preptember Video 3
								</h3>
								<p className="text-base font-normal text-zinc-300">
									Moving on, we will understand the backend 
									and integration concepts. 
								</p>
							</div>
						</li>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLock fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									8 October 2024 
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Registrations Open
								</h3>
								<p className="text-base font-normal text-zinc-300">
									The registrations for Hacktoberfest
									2024 will open on the website. 
								</p>
							</div>
						</li>
						<div></div>
						<div></div>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLightbulb fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									Coming Soon
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Stay tuned for updates!
								</h3>
								<p className="text-base font-normal text-zinc-300">
									The coding for Hacktoberfest 2024 will
									commence on 19th October 2024 at 7:15 PM.
								</p>
							</div>
						</li>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLightbulb fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									20 October 2024 - 02:00 AM
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Icebreaker Session 1
								</h3>
								<p className="text-base font-normal text-zinc-300">
									The first icebreaker session for
									Hacktoberfest 2024 will be held on 20th
									October 2024 at 2:00 AM.
								</p>
							</div>
						</li>
						<div></div>
						<div></div>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLightbulb fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									20 October 2024 - 09:30 AM
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Icebreaker Session 2
								</h3>
								<p className="text-base font-normal text-zinc-300">
									The second icebreaker session for
									Hacktoberfest 2024 will be held on 20th
									October 2024 at 9:30 AM.
								</p>
							</div>
						</li>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLightbulb fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									20 October 2024 - 02:00 PM
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Submissions Open
								</h3>
								<p className="text-base font-normal text-zinc-300">
									The submissions for Hacktoberfest 2024 will
									open on 20th October 2024 at 2:00 PM.
								</p>
							</div>
						</li>
						<div></div>
						<div></div>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLightbulb fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									20 October 2024 - 02:30 PM
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Coding Concludes
								</h3>
								<p className="text-base font-normal text-zinc-300">
									The coding for Hacktoberfest 2024 will
									conclude on 20th October 2024 at 2:30 PM.
								</p>
							</div>
						</li>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLightbulb fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									20 October 2024 - 03:00 PM
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Submissions Close
								</h3>
								<p className="text-base font-normal text-zinc-300">
									The submissions for Hacktoberfest 2024 will
									close on 20th October 2024 at 3:00 PM.
								</p>
							</div>
						</li>
						<div></div>
						<div></div>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLightbulb fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									20 October 2024 - 03:30 PM
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Presentations and Judging Begins
								</h3>
								<p className="text-base font-normal text-zinc-300">
									The presentations and judging for
									Hacktoberfest 2024 will begin on 20th
									October 2024 at 3:30 PM.
								</p>
							</div>
						</li>
						<li className="mb-10 ms-4 lg:flex">
							<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
								<FaLightbulb fontSize={12} />
							</div>
							<div className="my-auto">
								<time className="mb-1 text-sm font-normal leading-none text-green">
									20 October 2024 - 08:30 PM
								</time>
								<h3 className="text-lg font-semibold text-beige">
									Closing Ceremony
								</h3>
								<p className="text-base font-normal text-zinc-300">
									The closing ceremony of Hacktoberfest 2024
									will be held on 20th October 2024 at 8:30
									PM.
								</p>
							</div>
						</li>
					</ol>
				</div>
			</div>
		</div>
	);
}
