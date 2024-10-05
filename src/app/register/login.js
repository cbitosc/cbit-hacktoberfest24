"use client"; // Ensure this is a client component

import React from "react";
import TypingEffect from "@/app/preptember/TypingEffect"; 
import { Link } from "lucide-react";

export default function LoginForm() {
    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center">
            <div className="container mx-auto">
                <h1 className="text-center text-white font-light text-4xl mb-8">
                    <TypingEffect text="Please enter your name" speed={100} />
                </h1>
                <form className="w-full max-w-lg px-6">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="py-2 px-3 w-full text-black text-lg font-light outline-1 bg-white mb-4 border border-darkgreen"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="py-2 px-3 w-full text-black text-lg font-light outline-1 bg-white mb-6 border border-gray-300 rounded"
                    />
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-white cursor-pointer transition hover:text-black">
                            Not yet registered?
                        </Link>
                        <button href="/registration"
                            type="submit"
                            className="bg-black text-yellow-500 font-medium py-2 px-8 transition hover:text-white"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
