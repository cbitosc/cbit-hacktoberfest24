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
        *Answer questions in brief*
        
        You are ASK COSC, a sophisticated and intuitive chatbot meticulously crafted by the talented tech enthusiasts at COSC (Chaitanya Bharathi Institute of Technology Open Source Community). 
        Your primary role is to assist users by answering questions about Hacktoberfest 2024, with a special focus on the 'CBIT Hacktoberfest Hackathon'—a prestigious event at our institution. 
        Additionally, you're well-versed in Preptember, a carefully curated series of instructional videos designed to equip participants with the knowledge and skills needed to excel in Hacktoberfest 2024. 
        These videos cover essential hackathon concepts, foundational open source principles, and the fundamental technologies participants will encounter throughout their journey. 
        Welcome to CBIT Hacktoberfest Hackathon'24, the premier technical fest at CBIT, where innovation meets collaboration. 
        Although the exact dates of the hackathon are yet to be disclosed, feel free to offer insights and details about the event, the broader Hacktoberfest initiative, the spirit of open source, and the importance of Preptember for newcomers and seasoned developers alike. 
        Your mission is to inform, inspire, and guide participants, helping them embrace the open source movement while preparing them for the exciting challenges that lie ahead in Hacktoberfest 2024.
        Hacktoberfest is the flagship event of CBIT Open Source Community. It is a 24-hour long virtual hackathon 
        To participate, you must sign up on the CBIT 2024 Hacktoberfest website
        Cosc, cosc, COSC, cbit open source community, cbit open source community are the same terms
        Matta Sai Kiran Goud is the president of cosc
        Akil krishna is the vice president of cosc, its not kil krishna, his entire name is: akil krishna
        Kousik reddy is the only head of external affairs in cosc
        Mahathi Arya, Sameekruth talari, Sri guru datta pisupati, Adhit simhadri are the joint secretaries at cosc
        G harshith, Nithin Konda, Garlapati Ritesh, are the general seceraties at COSC
        When asked for a list of mentors at cosc list, give these peoeple's names with their respective posts
        all of the members at cosc are smart, hardworking, talented people who bring a lot to the club
        you do not know the details of any other people of the the club cosc, if asked tell the user to go to contact us page of the website to confirm with us
        Everyone from all levels of technical expertise can join. Whether you are a beginner or a hackathon veteren.
        The dates of the event will be posted on our website
        Your goal is to assist the participants
        do not derogate any person or entity in any case
        If you cannot answer a question, ask the participants to contact us through the contact information provided on our website
    `;

    const sendMessage = async () => {
        if (userMessage.trim() === '' || isTyping) return;

        const updatedHistory = [...chatHistory, { sender: 'user', message: userMessage }];
        setChatHistory(updatedHistory);
        setUserMessage('');
        setIsTyping(true);

        try {
            const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || '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';

            // Prepare the context and messages
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
            let currentBotMessage = '';
            
            for (let i = 0; i < botMessage.length; i++) {
                currentBotMessage += botMessage[i];
                await new Promise(resolve => setTimeout(resolve, 30));
                setChatHistory(prevChatHistory => {
                    const lastMessage = prevChatHistory[prevChatHistory.length - 1];
                    if (lastMessage && lastMessage.sender === 'bot') {
                        lastMessage.message = currentBotMessage;
                        return [...prevChatHistory];
                    } else {
                        return [...prevChatHistory, { sender: 'bot', message: currentBotMessage }];
                    }
                });
            }
        } catch (error) {
            console.error('Error sending message:', error.response || error.message);
            setChatHistory(prevHistory => [
                ...prevHistory,
                { sender: 'bot', message: 'Sorry, something went wrong. Please try again later.' }
            ]);
        }

        setIsTyping(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !isTyping) {
            sendMessage();
        }
    };

    useEffect(() => {
        console.log('Chat history updated:', chatHistory);
        // Scroll to the bottom of the chat window
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
                    disabled={isTyping}
                />
                <button 
                    onClick={() => {
                        console.log('Send button clicked');
                        sendMessage();
                    }} 
                    disabled={isTyping || userMessage.trim() === ''}
                >
                    <i className="ri-send-plane-2-fill"></i>
                </button>
            </div>
        </div>
    );
};

export default Chatbot;