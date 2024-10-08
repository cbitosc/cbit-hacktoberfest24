"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./styles/timer.css";
import StackedText from "./StackedText";

const getTimeLeft = (expiry) => {
	let days = "0";
	let hours = "0";
	let minutes = "0";
	let seconds = "0";
	const difference = new Date(expiry).getTime() - new Date().getTime();
	if (difference <= 0) {
		return { days, hours, minutes, seconds };
	}
	const ds = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hs = Math.floor((difference / (1000 * 60 * 60)) % 24);
	const ms = Math.floor((difference / (1000 * 60)) % 60);
	const ss = Math.floor((difference / 1000) % 60);
	days = ds < 10 ? `0${ds}` : ds.toString();
	hours = hs < 10 ? `0${hs}` : hs.toString();
	minutes = ms < 10 ? `0${ms}` : ms.toString();
	seconds = ss < 10 ? `0${ss}` : ss.toString();
	return { days, hours, minutes, seconds };
};

const Timer = ({ launchDate }) => {
	const [timeLeft, setTimeLeft] = useState(getTimeLeft(launchDate));
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.3 }); // Removed 'once: true'
	const controls = useAnimation();

	useEffect(() => {
		let frame;
		const update = () => {
			setTimeLeft(getTimeLeft(launchDate));
			frame = requestAnimationFrame(update);
		};
		frame = requestAnimationFrame(update);
		return () => cancelAnimationFrame(frame);
	}, [launchDate]);

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		} else {
			controls.start("hidden");
		}
	}, [isInView, controls]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 100, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
			},
		},
	};

	return (
		<div suppressHydrationWarning>
			<section
				ref={ref}
				className="py-24 bg-repeaat w-full flex flex-col justify-between items-center"
			>
				<h1 className="text-4xl w-full text-center flex flex-col items-center justify-center">
					<StackedText text="When???" fontSize="75px" />
					<span className="text-beige mt-7">
						{" "}
						Hackathon Starts In..{" "}
					</span>
				</h1>
				<div className="flex-col w-full justify-between items-center lg:flex-row">
					<aside className="w-full text-center flex items-center justify-center">
						<motion.div
							className="lg:flex-row flex flex-col justify-center lg:justify-start mt-10 gap-1.5"
							variants={containerVariants}
							initial="hidden"
							animate={controls}
						>
							{[
								{ value: timeLeft.days, label: "Days" },
								{ value: timeLeft.hours, label: "Hours" },
								{ value: timeLeft.minutes, label: "Minutes" },
								{ value: timeLeft.seconds, label: "Seconds" },
							].map((item) => (
								<motion.span
									key={item.label}
									variants={itemVariants}
									className="flex flex-col justify-center items-center bg-green text-black text-5xl lg:w-36 w-56 py-3 shadow-lg rounded-xl"
								>
									{item.value}
									<small className="text-xs lg:text-sm uppercase font-semibold text-darkgreen">
										{item.label}
									</small>
								</motion.span>
							))}
						</motion.div>
					</aside>
				</div>
			</section>
		</div>
	);
};

export default Timer;
