import React from "react";
import TypingEffect from "@/app/preptember/TypingEffect";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation"; // Updated import for programmatic navigation

export default function RegisterForm() {

    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center">
            <div className="container mx-auto">
                <h1 className="text-center text-white font-light text-4xl mb-8">
                    <TypingEffect text="Welcome back, Please sign In" speed={100} />
                </h1>
                <form className="w-full max-w-lg px-6">
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        className="py-2 px-3 w-full text-black text-lg font-light outline-1 bg-white mb-4 border border-darkgreen"
                    />
                    <input
                        type="tel"
                        name="number"
                        placeholder="Phone Number"
                        className="py-2 px-3 w-full text-black text-lg font-light outline-1 bg-white mb-6 border border-gray-300"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="py-2 px-3 w-full text-black text-lg font-light outline-1 bg-white mb-6 border border-gray-300"
                    />
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-white cursor-pointer transition hover:text-black">
                            Not yet registered?
                        </Link>
                        <button
                            type="button" // Change to "button" to prevent form submission
                            className="bg-black text-yellow-500 font-medium py-2 px-8 transition hover:text-white" // Navigate to registration on click
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
