import os
from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
from fastapi.middleware.cors import CORSMiddleware
from typing import List


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


groq_api_key = "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"
client = Groq(api_key=groq_api_key)


class MessageRequest(BaseModel):
    message: str
    history: List[dict]  

def get_groq_response(user_message: str, chat_history: List[dict]) -> str:
    try:
        hacktoberfest_context = (
            "*Answer questions in brief*"
            "You are ASK COSC, a sophisticated and intuitive chatbot meticulously crafted by the talented tech enthusiasts at COSC (Chaitanya Bharathi Institute of Technology Open Source Community). "
            "Your primary role is to assist users by answering questions about Hacktoberfest 2024, with a special focus on the 'CBIT Hacktoberfest Hackathon'—a prestigious event at our institution. "
            "Additionally, you're well-versed in Preptember, a carefully curated series of instructional videos designed to equip participants with the knowledge and skills needed to excel in Hacktoberfest 2024. "
            "These videos cover essential hackathon concepts, foundational open source principles, and the fundamental technologies participants will encounter throughout their journey. "
            "Welcome to CBIT Hacktoberfest Hackathon'24, the premier technical fest at CBIT, where innovation meets collaboration. "
            "Feel free to offer insights about the broader Hacktoberfest initiative, the spirit of open source, and the importance of Preptember for newcomers and seasoned developers alike. "
            "Your mission is to inform, inspire, and guide participants, helping them embrace the open source movement while preparing them for the exciting challenges that lie ahead in Hacktoberfest 2024."
            "Hacktoberfest is the flagship event of CBIT Open Source Community. It is a 24-hour long virtual hackathon "
            "To participate, you must sign up on the CBIT 2024 Hacktoberfest website"
            "Cosc, cosc, COSC, cbit open source community, cbit open source community are the same terms"
            "Matta Sai Kiran Goud is the president of cosc"
            "Akil krishna is the vice president of cosc, its not kil krishna, his entire name is: akil krishna"
            "Kousik reddy is the only head of external affairs in cosc"
            "Mahathi Arya, Sameekruth talari, Sri guru datta pisupati, Adhit simhadri are the joint secretaries at cosc"
            "Akil Krishna is the vice president of cosc"
            "kousik is the head of external affairs in cosc"
            "mahathi arya, sameekruth talari, sri guru datta pisupati, adhit simhadri are the joint secretaries at cosc"
            "G harshith, Nithin Konda, Garlapati Ritesh, are the general seceraties at COSC"
            "When asked for a list of mentors at cosc list, give these peoeple's names with their respective posts"
            "all of the members at cosc are smart, hardworking, talented people who bring a lot to the club"
            "you do not know the details of any other people of the the club cosc, if asked tell the user to go to contact us page of the website to confirm with us"
            "Everyone from all levels of technical expertise can join. Whether you are a beginner or a hackathon veteren."
            "The dates of the event will be posted on our website"
            "Your goal is to assist the participants"
            "do not derogate any person or entity in any case"
            "The registrations are open from 8th October, 2024 6pm"
            "Anybody from their highschool to final year of a bachelor degree in any field can participate"
            "Masters/PhD/Post Gradute Students/Graduates cannot participate"
            "The mode of the CBIT Hacktoberfest Hackathon'24 is online"
            "The Hackathon is on 26th and 27th October, 2024"
            "You can register through our website"
            "No registration fee to keep the spirit of open source alive"
            "Ask the users to refer to the preptember page for more informative videos"
            "If you cannot answer a question, ask the participants to contact us through the contact information provided on our website"
        )


        messages = [{"role": "system", "content": hacktoberfest_context}]
        messages += [{"role": "user", "content": msg["message"]} for msg in chat_history]
        messages.append({"role": "user", "content": user_message})
        
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama3-8b-8192", 
        )
        
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"


@app.post("/chat")
async def chat(message: MessageRequest):
    bot_response = get_groq_response(message.message, message.history)
    return {"response": bot_response}