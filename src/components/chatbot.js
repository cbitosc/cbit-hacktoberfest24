"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import "./styles/chatbot.css";

const Chatbot = ({ chatHistory, setChatHistory }) => {
    console.log('Chatbot component rendered');
    const [userMessage, setUserMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatWindowRef = useRef(null);

    const hacktoberfestContext = `
    bot_identity:
    name: "ASK COSC"
    creator: "COSC (Chaitanya Bharathi Institute of Technology Open Source Community)"
    primary_role: "Assist users with questions about Hacktoberfest 2024 and CBIT Hacktoberfest Hackathon"
  
  event_info:
    name: "CBIT Hacktoberfest Hackathon'24"
    type: "24-hour virtual hackathon"
    dates: "October 26-27, 2024"
    time: "26th October 4pm - 27th October 8:30pm"
    cash prize: "Not to be disclosed yet"
    registration:
      opens: "October 8, 2024, 6 PM"
      fee: "Free"
      process: "Sign up on the CBIT 2024 Hacktoberfest website"
    mode: "Online- through Discord"
    eligibility: "High school to final year bachelor's degree students in any field"
  
  cosc_team, core_committee, mentors:
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
 cosc_organising_committee: 
    - "Meghana Sancheti"
    - "Mohammed Imaddudin" 
    - "Muzzafar"
    - "Amulya Motta"
    - "Jayanth Gudimella"
    - "Sharanya Peri"
    - "Sneha Arumugam" 
    - "Srilekha Kasha"
    - "Sriya Palaparti"
    - "Kavyashree Poojari"
    - "Rishi Mamilla"
    - "Doma Akshitha Reddy"
    - "Ajith Sai Chekka"
    - "Harshavardhan Reddy"
    - "Anirudh Reddy"
    
   
  
  
  participation_info:
    who_can_participate: "All levels of technical expertise, from beginners to hackathon veterans" "Cross Institution teams are allowed"
    who_cannot_participate: "Masters/PhD/Post Graduate Students/Graduates/Working professionals"
  
  response_guidelines:
    - "Answer questions briefly"
    - "this is beginner friendly"
    - "Offer insights about Hacktoberfest, open source, and Preptember"
    - "Core Committee Members are president, vice_president, head_of_external_affairs, general_secretaries, joint_secretaries."
    - "When asked about COSC members, mention the core committee members and just mention that there are other organising Committee Members"
    - "Guide participants to the Preptember page for more informative videos"
    - "Cross institution teams are allowed."
    - "Direct users to the contact page when asked questions you cant answer"
    - "Do not derogate any person or entity under any circumstance"
    - "If unable to answer, direct participants to contact us section on the website"
    - "Handbook will be released soon"
    - "Further details will be posted in the whatsapp group you join after registration."
    - "Everyone who participates will get a participation certificate."
    - "Problem statements will be released on 6pm on 26th October"
    - "only the team leader will be joining the whatsapp group"
    - "You can join discord server on 26th october"
    - "One person cannot be a part of more than one team" 
    - "If you have registered on Unstop or Hack2Skill, please register through the website as well"
    - "Teams of 1 and 2 will be automatically paired up by the OC to meet the 3-5 participants criteria."
    - "the team lead can add participants to it's team until the deadline for registrations." 
    - "For the hackathon, you will need a laptop with a microphone, camera and a good connection"
    - "Refer to the preptember page for tech stack ideas" 
  `;

  const typeMessage = async (message) => {
    let currentMessage = '';
    setIsTyping(true);
    
    for (let i = 0; i < message.length; i++) {
        currentMessage += message[i];
        await new Promise(resolve => setTimeout(resolve, 30));
        setChatHistory(prevChatHistory => {
            const lastMessage = prevChatHistory[prevChatHistory.length - 1];
            if (lastMessage && lastMessage.sender === 'bot') {
                lastMessage.message = currentMessage;
                return [...prevChatHistory];
            } else {
                return [...prevChatHistory, { sender: 'bot', message: currentMessage }];
            }
        });
    }
    
    setIsTyping(false);
};

useEffect(() => {
    if (chatHistory.length === 0) {
        const welcomeMessage = "Hello! I'm ASK COSC, here to assist you with questions about Hacktoberfest 2024 and the CBIT Hacktoberfest Hackathon. How can I help you today?";
        typeMessage(welcomeMessage);
    }
}, []);

const sendMessage = async () => {
    if (userMessage.trim() === '' || isTyping) return;

    const updatedHistory = [...chatHistory, { sender: 'user', message: userMessage }];
    setChatHistory(updatedHistory);
    setUserMessage('');
    setIsTyping(true);

    try {
        const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

        const messages = [
            { role: "system", content: hacktoberfestContext },
            ...updatedHistory.map(chat => ({
                role: chat.sender === 'user' ? 'user' : 'assistant',
                content: chat.message
            }))
        ];

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            { 
                messages, 
                model: 'llama3-8b-8192',
                temperature: 0.7,
                max_tokens: 150
            },
            { 
                headers: { 
                    Authorization: `Bearer ${groqApiKey}`, 
                    'Content-Type': 'application/json' 
                } 
            }
        );

        const botMessage = response.data.choices[0].message.content;
        await typeMessage(botMessage);
    } catch (error) {
        console.error('Error sending message:', error.response || error.message);
        await typeMessage('Sorry, something went wrong. Please try again later.');
    }
};

const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isTyping) {
        sendMessage();
    }
};

useEffect(() => {
    console.log('Chat history updated:', chatHistory);
    if (chatWindowRef.current) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
}, [chatHistory]);

return (
    <div className="chatbot">
        <div className="chat-window" ref={chatWindowRef}>
            {chatHistory.map((chat, index) => (
                <div key={index} className={`chat-message ${chat.sender}-message`}>
                    {chat.sender === 'user' ? 'You' : 'Ask COSC'} <Markdown>{chat.message}</Markdown>
                </div>
            ))}
        </div>
        <div className="input">
            <input
                type="text"
                value={userMessage}
                onChange={(e) => {
                    console.log('User input changed:', e.target.value);
                    setUserMessage(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type your message"
                disabled={false} 
            />
            <button 
                onClick={sendMessage} 
                disabled={isTyping || userMessage.trim() === ''}
            >
                <i className="ri-send-plane-2-fill"></i>
            </button>
        </div>
    </div>
);
};

export default Chatbot;