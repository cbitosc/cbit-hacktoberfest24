"use client";

import { useState, useEffect, useRef } from "react";
import Chatbot from "@/components/chatbot";
import "remixicon/fonts/remixicon.css";

export default function RootLayoutClient({ children }) {
	const [isChatbotOpen, setIsChatbotOpen] = useState(false);
	const [chatHistory, setChatHistory] = useState([]);
	const chatbotRef = useRef(null);
	const [isMobile, setIsMobile] = useState(false);

	const toggleChatbot = () => {
		setIsChatbotOpen(!isChatbotOpen);
	};

	// Function to check if the device is mobile
	const checkIsMobile = () => {
		setIsMobile(window.matchMedia("(max-width: 768px)").matches);
	};

	// Check for mobile device on mount and window resize
	useEffect(() => {
		checkIsMobile();
		window.addEventListener("resize", checkIsMobile);
		return () => window.removeEventListener("resize", checkIsMobile);
	}, []);

	// Handle scroll behavior
	useEffect(() => {
		if (isChatbotOpen && isMobile) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isChatbotOpen, isMobile]);

	// Close the chatbot when clicking outside of it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				chatbotRef.current &&
				!chatbotRef.current.contains(event.target) &&
				!event.target.closest(".chatbot-button")
			) {
				setIsChatbotOpen(false);
			}
		};

		if (isChatbotOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isChatbotOpen]);

	return (
		<>
			{children}
			<button
				className="chatbot-button md:bottom-[60px]"
				onClick={toggleChatbot}
			>
				<i className="ri-bard-fill"></i>
				<p className="text-lg ml-3">
					{isChatbotOpen ? "Close" : "Ask COSC!"}
				</p>
			</button>

			{isChatbotOpen && (
				<div className="chatbot-popup" ref={chatbotRef}>
					<Chatbot
						chatHistory={chatHistory}
						setChatHistory={setChatHistory}
					/>
				</div>
			)}
		</>
	);
}
