"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TypingEffect = ({ text, speed }) => {
	const [displayedText, setDisplayedText] = useState("");
	const [index, setIndex] = useState(0);
	const [showCursor, setShowCursor] = useState(true);
	const [typingComplete, setTypingComplete] = useState(false);
	const textRef = useRef(null);

	useEffect(() => {
		if (index < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + text[index]);
				setIndex(index + 1);
			}, speed);
			return () => clearTimeout(timeout);
		} else {
			setTypingComplete(true);
		}
	}, [index, text, speed]);

	useEffect(() => {
		if (!typingComplete) {
			const cursorInterval = setInterval(() => {
				setShowCursor((prev) => !prev);
			}, 500);
			return () => clearInterval(cursorInterval);
		}
	}, [typingComplete]);

	useEffect(() => {
		const trigger = ScrollTrigger.create({
			trigger: textRef.current,
			start: "top 110%",
			onEnter: () => {
				setIndex(0);
				setDisplayedText("");
				setTypingComplete(false);
			},
		});

		return () => trigger.kill();
	}, []);

	return (
		<span ref={textRef}>
			{displayedText}
			{showCursor && (
				<span className="blinking-cursor blinking-underscore text-beige">
					_
				</span>
			)}
		</span>
	);
};

export default TypingEffect;
