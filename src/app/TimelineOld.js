"use client";

import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaLightbulb, FaLock } from "react-icons/fa6";
import { BiSolidParty } from "react-icons/bi";
import { GoMultiSelect } from "react-icons/go";
import { motion, useScroll, useTransform } from "framer-motion";

import "./timeline-styles.css";
import StackedTextDark from "@/components/StackedTextdark";

export default function Timeline() {
	const [width, setWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0
	);

	useEffect(() => {
		const handleWindowSizeChange = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const listRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: listRef,
		offset: ["start start", "end end"],
	});

	const timelineProgress = useTransform(scrollYProgress, [0, 1], [0.1, 0.8], {
		clamp: true,
	});

	const isMobile = width && width <= 1024;
	return (
		<div
			className={cn(
				"overflow-hidden timeline-background w-full bg-beige text-darkgrey",
				"p-12",
				"relative"
			)}
		>
			<div className="text-center">
				<StackedTextDark text="Timeline" fontSize="72px" />
			</div>
			<div
				className={cn("w-full py-8 ok", "flex flex-col-reverse gap-y-12")}
				ref={listRef}
			>
				<div className="lg:px-20 lg:flex lg:items-center lg:justify-center">
					<ol
						className={cn(
							"relative border-s border-green border-l-2 lg:border-none",
							"lg:grid lg:grid-cols-2 lg:max-w-[80%]"
						)}
					>
						<motion.div
							id="progress"
							style={{
								scaleY: timelineProgress,
							}}
						></motion.div>
						<div></div>
						<TimelineItem
							date="30th September 2024"
							title="Preptember Begins"
							content="Preptember, like the name suggests, is a preparation month for Hacktoberfest. It is a great way to delve into open source and prep for the upcoming hackathon. The first video explores the first phase of a hackathon."
							link="/preptember"
							icon={<FaLightbulb fontSize={12} />}
							multiplier={1}
						/>
						<TimelineItem
							date="8th October 2024"
							title="Registrations Open"
							content="The registrations for Hacktoberfest 2024 will open on the website."
							icon={<BiSolidParty fontSize={12} />}
							multiplier={isMobile ? 1 : -1}
						/>
						<div></div>
						<div></div>
						<TimelineItem
							date="24th October 2024"
							title="Registrations Close"
							content="Registrations will be closed."
							icon={<GoMultiSelect fontSize={12} />}
							multiplier={1}
						/>
						<TimelineItem
							date="26th October 2024"
							title="Day 1 Begins"
							content={
								<>
									4:00 PM - Opening Ceremony
									<br />
									6:00 PM - Problem Statements Released
									<br />
									6:45 PM - Problem Statement Finalization
									<br />
									7:15 PM - Coding Begins
									<br />
									2:00 AM - Ice-Breaker Session 1
								</>
							}
							icon={<BiSolidParty fontSize={12} />}
							multiplier={isMobile ? 1 : -1}
						/>
						<div></div>
						<div></div>
						<TimelineItem
							date="27th October 2024"
							title="Day 2 & Closing"
							content={
								<>
									9:30 AM - Ice-Breaker Session 2<br />
									2:00 PM - Submissions Open
									<br />
									2:30 PM - Submissions Close
									<br />
									3:00 PM - Coding Ends
									<br />
									3:30 PM - Presentations
									<br />
									8:30 PM - Closing Ceremony
								</>
							}
							icon={<BiSolidParty fontSize={12} />}
							multiplier={1}
						/>
					</ol>
				</div>
			</div>
		</div>
	);
}

function TimelineItem({ date, title, content, link, icon, multiplier = 1 }) {
	const [width, setWidth] = useState(null);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isMobile = width && width <= 1024;

	return (
		<motion.li
			className="mb-10 ms-4 lg:flex timeline-item"
			initial={{ opacity: 0, x: isMobile ? 100 : 100 * multiplier }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true, amount: 0.5 }}
			transition={{ duration: 0.5 }}
		>
			<div className="flex justify-center items-center absolute w-5 h-5 bg-green rounded-full mt-2.5 -start-2.5 border border-darkgreen text-darkgreen">
				{icon}
			</div>
			<div className="my-auto">
				<time className="mb-1 text-sm font-normal leading-none text-green">
					{date}
				</time>
				<h3 className="text-lg font-semibold text-beige">{title}</h3>
				<p className="mb-4 text-base font-normal text-zinc-300">
					{content}
				</p>
				{link && (
					<Link
						href={link}
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
				)}
			</div>
		</motion.li>
	);
}
