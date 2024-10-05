"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import "./styles/chatbot.css";

const Chatbot = () => {
	const [userMessage, setUserMessage] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [isTyping, setIsTyping] = useState(false);
	const chatWindowRef = useRef(null);

	const scrollToBottom = () => {
		if (chatWindowRef.current) {
			chatWindowRef.current.scrollTop =
				chatWindowRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatHistory, isTyping]);

	const sendMessage = async () => {
		if (userMessage.trim() === "" || isTyping) return;

		const updatedHistory = [
			...chatHistory,
			{ sender: "user", message: userMessage },
		];
		setChatHistory(updatedHistory);
		setUserMessage("");
		setIsTyping(true);

		try {
			const response = await axios.post("http://localhost:3001/chat", {
				message: userMessage,
				history: updatedHistory.map((chat) => ({
					role: chat.sender === "user" ? "user" : "bot",
					message: chat.message,
				})),
			});

			const botMessage = response.data.response;
			let currentBotMessage = "";

			for (let i = 0; i < botMessage.length; i++) {
				currentBotMessage += botMessage[i];
				await new Promise((resolve) => setTimeout(resolve, 30));
				setChatHistory((prevChatHistory) => {
					const lastMessage =
						prevChatHistory[prevChatHistory.length - 1];
					if (lastMessage && lastMessage.sender === "bot") {
						lastMessage.message = currentBotMessage;
						return [...prevChatHistory];
					} else {
						return [
							...prevChatHistory,
							{ sender: "bot", message: currentBotMessage },
						];
					}
				});
			}
		} catch (error) {
			return setChatHistory((prevHistory) => [
				...prevHistory,
				{
					sender: "bot",
					message:
						"Sorry, something went wrong. Please try again later.",
				},
			]);
		}

		setIsTyping(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !isTyping) {
			sendMessage();
		}
	};

	return (
		<div className="chatbot">
			<div className="chat-window" ref={chatWindowRef}>
				{chatHistory.map((chat, index) => (
					<div
						key={index}
						className={`chat-message ${chat.sender}-message`}
					>
						{chat.sender === "user" ? "You" : "Ask COSC"}{" "}
						<Markdown>{chat.message}</Markdown>
					</div>
				))}
			</div>
			<div className="input">
				<input
					type="text"
					value={userMessage}
					onChange={(e) => setUserMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type your message"
				/>
				<button
					onClick={sendMessage}
					disabled={isTyping || userMessage.trim() === ""}
				>
					<i className="ri-send-plane-2-fill"></i>
				</button>
			</div>
		</div>
	);
};

export default Chatbot;
