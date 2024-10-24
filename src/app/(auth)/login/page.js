"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Mail, Lock } from "lucide-react";
import TypingEffect2 from "@/app/TypingEffect2";
import "../styles/registration.css";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "@/app/firebase";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginPage = () => {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleContinue = () => {
    setEmailSubmitted(true);
    setShowPasswordInput(true);
    setFocus("password");
  };

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const db = getFirestore();

      // First check if user has a team (is a team leader)
      const userDocRef = doc(db, "teams", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // User is a team leader
        toast.success("Successfully logged in!");
        router.push("/teamdetails");
        return;
      }

      // If not a team leader, check if user is a participant
      const participantDoc = await getDocs(
        query(
          collection(db, "participants"),
          where("email", "==", user.email)
        )
      );

      if (!participantDoc.empty) {
        // User is a participant
        toast.success("Successfully logged in!");
        router.push("/teamdetails");
      } else {
        // User is neither a team leader nor a participant
        toast.error("You are not registered with any team. Please complete registration.");
        router.push("/register");
      }

    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
      setForgotPasswordMode(false);
    } catch (error) {
      toast.error(`Failed to send reset email: ${error.message}`);
    }
  };

  return (
    <div className="background-gradient flex flex-col items-center justify-center min-h-screen bg-darkgrey px-2">
      <div className="w-full max-w-md p-8 space-y-8 glassomorphism rounded-lg shadow">
        <h2 className="text-xl font-bold lg:text-3xl text-green">
          <TypingEffect2
            text="Welcome back, participant!"
            speed={50}
            onComplete={() => setShowEmailInput(true)}
          />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold lg:text-xl text-pink">
              {emailSubmitted
                ? "Your Email"
                : showEmailInput && (
                    <TypingEffect2
                      text="Enter your email to continue"
                      speed={50}
                    />
                  )}
            </h2>
            {showEmailInput && (
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full px-10 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
                  placeholder="Enter your email"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !showPasswordInput) {
                      event.preventDefault();
                      handleContinue();
                    }
                  }}
                />
                <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              </div>
            )}
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {showPasswordInput && !forgotPasswordMode && (
            <div className="space-y-2">
              <h2 className="text-xl font-bold lg:text-xl text-pink">
                <TypingEffect2
                  text="Now, enter your password"
                  speed={50}
                />
              </h2>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full px-10 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
                  placeholder="Enter your password"
                />
                <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          )}

          {showEmailInput && !showPasswordInput ? (
            <button
              type="button"
              onClick={handleContinue}
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-green rounded-md hover:bg-pink transition-all focus:outline-none focus:ring-2 focus:ring-deeppink focus:ring-offset-2"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            showPasswordInput && !forgotPasswordMode && (
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-green rounded-md hover:bg-pink transition-all focus:outline-none focus:ring-2 focus:ring-deeppink focus:ring-offset-2"
              >
                Log in
              </button>
            )
          )}

          {showPasswordInput && !forgotPasswordMode && (
            <button
              type="button"
              onClick={() => setForgotPasswordMode(true)}
              className="w-full text-pink hover:text-green transition-all focus:outline-none"
            >
              Forgot Password?
            </button>
          )}

          {forgotPasswordMode && (
            <div className="space-y-4">
              <p className="text-white">Enter your email to reset your password:</p>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="w-full px-4 py-2 text-white bg-pink rounded-md hover:bg-green transition-all focus:outline-none focus:ring-2 focus:ring-deeppink focus:ring-offset-2"
              >
                Send Reset Email
              </button>
              <button
                type="button"
                onClick={() => setForgotPasswordMode(false)}
                className="w-full text-pink hover:text-green transition-all focus:outline-none"
              >
                Back to Login
              </button>
            </div>
          )}
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;