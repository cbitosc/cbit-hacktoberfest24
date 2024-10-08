import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import "./styles/chatbot.css";

const hacktoberfestContext = `
bot_identity:
  name: "ASK COSC"
  creator: "COSC (Chaitanya Bharathi Institute of Technology Open Source Community)"
  primary_role: "Assist users with questions about Hacktoberfest 2024 and CBIT Hacktoberfest Hackathon"

event_info:
  name: "CBIT Hacktoberfest Hackathon'24"
  type: "24-hour virtual hackathon"
  dates: "October 26-27, 2024"
  registration:
    opens: "October 8, 2024, 6 PM"
    fee: "Free"
    process: "Sign up on the CBIT 2024 Hacktoberfest website"
  mode: "Online"
  eligibility: "High school to final year bachelor's degree students in any field"

cosc_team:
  president: "Matta Sai Kiran Goud"
  vice_president: "Akil Krishna"
  head_of_external_affairs: "Kousik Reddy"
  joint_secretaries: 
    - "Mahathi Arya"
    - "Sameekruth Talari"
    - "Sri Guru Datta Pisupati"
    - "Adhit Simhadri"
  general_secretaries:
    - "G Harshith"
    - "Nithin Konda"
    - "Garlapati Ritesh"

participation_info:
  who_can_participate: "All levels of technical expertise, from beginners to hackathon veterans"
  who_cannot_participate: "Masters/PhD/Post Graduate Students/Graduates"

response_guidelines:
  - "Answer questions briefly"
  - "Offer insights about Hacktoberfest, open source, and Preptember"
  - "Guide participants to the Preptember page for more informative videos"
  - "Do not provide details about COSC members not listed; direct users to the contact page"
  - "Do not derogate any person or entity"
  - "If unable to answer, direct participants to contact information on the website"
`;

const Chatbot = ({ chatHistory, setChatHistory }) => {
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const chatWindowRef = useRef(null);
  const initialMessageSentRef = useRef(false);

  useEffect(() => {
    // Send a greeting message when the component mounts
    if (chatHistory.length === 0 && !initialMessageSentRef.current){
      sendBotMessage("Hello! I'm ASK COSC, here to assist you with questions about Hacktoberfest 2024 and the CBIT Hacktoberfest Hackathon. How can I help you today?");
	  initialMessageSentRef.current = true;
    }
  }, [chatHistory]);

  const sendBotMessage = async (message) => {
    setIsTyping(true);
    setCurrentBotMessage("");

    for (let i = 0; i < message.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      setCurrentBotMessage((prev) => prev + message[i]);
    }

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { sender: "bot", message: message },
    ]);

    setCurrentBotMessage("");
    setIsTyping(false);
  };

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
      const groqApiKey =
        process.env.NEXT_PUBLIC_GROQ_API_KEY ||
        "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";

      // Prepare the context and messages
      const messages = [
        { role: "system", content: hacktoberfestContext },
        ...updatedHistory.map((chat) => ({
          role: chat.sender === "user" ? "user" : "assistant",
          content: chat.message,
        })),
      ];

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          messages,
          model: "llama3-8b-8192",
          temperature: 0.7,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${groqApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      await sendBotMessage(botMessage);
    } catch (error) {
      setChatHistory((prevHistory) => [
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

  useEffect(() => {
    // Scroll to the bottom of the chat window
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop =
        chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory, currentBotMessage]);

  return (
    <div className="chatbot">
      <div className="chat-window" ref={chatWindowRef}>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-message ${chat.sender}-message`}
          >
            {chat.sender === "user" ? "You" : "Ask COSC"}:{" "}
            <Markdown>{chat.message}</Markdown>
          </div>
        ))}
        {isTyping && (
          <div className="chat-message bot-message">
            Ask COSC: <Markdown>{currentBotMessage}</Markdown>
          </div>
        )}
      </div>
      <div className="input">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type your message"
          disabled={isTyping}
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