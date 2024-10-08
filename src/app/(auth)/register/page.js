"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Mail, Lock } from "lucide-react";
import "../styles/registration.css";
import TypingEffect2 from "@/app/TypingEffect2";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import Link from "next/link";

const schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().optional(),
  })
  .refine((data) => !data.confirmPassword || data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleContinue = async () => {
    if (step < 3) {
      const isValid = await trigger(step === 1 ? "email" : "password");
      if (isValid) {
        if (step === 1) {
          setEmailSubmitted(true);
        }
        if (step === 2) setPasswordSubmitted(true);
        setStep(step + 1);
      }
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (step === 3) {
        const form = event.target.form;
        form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      } else {
        handleContinue();
      }
    }
  };

  const onSubmit = async (data) => {
    if (step === 3 && !data.agreeToTerms) {
      toast.error("Please agree to the terms before signing up");
      return;
    }

    toast.promise(
      createUserWithEmailAndPassword(auth, data.email, data.password),
      {
        loading: "Creating your account...",
        success: () => {
          toast.promise(sendEmailVerification(auth.currentUser), {
            loading: "Sending verification email...",
            success: () => {
              router.push("/verifyemail");
              return "Account created successfully, next, verify your email";
            },
            error: (err) => {
              return `Verification email failed: ${err.message}`;
            },
          });
        },
        error: (err) => {
          if (err.code === "auth/email-already-in-use") {
            return (t) => (
              <>
                <p>
                  Email already in use. If you have already registered,{" "}
                  <Link
                    href="/login"
                    className="text-green underline underline-offset-2 hover:text-deeppink"
                  >
                    Login
                  </Link>{" "}
                  instead
                </p>
              </>
            );
          }
          return `Sign up failed: ${new String(err.message)
            .replace(")", "")
            .split("/")[1]
            .split("-")
            .join(" ")}`;
        },
      }
    );
  };

  return (
    <div className="pt-20 pb-4 background-gradient min-h-screen flex flex-col items-center justify-center bg-darkgrey px-2">
      <div className="w-full max-w-md p-8 space-y-8 glassomorphism rounded-lg shadow">
        <h2 className="text-xl font-bold lg:text-3xl text-green">
          <TypingEffect2
            text="Time to code, collaborate, and contribute!"
            speed={50}
            onComplete={() => setShowSecondText(true)}
          />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step >= 1 && (
            <div className="space-y-2">
              <h2 className="text-l font-bold lg:text-xl text-pink">
                {emailSubmitted
                  ? "Your Email"
                  : showSecondText && (
                      <TypingEffect2
                        text="Let's get started, enter your email"
                        speed={50}
                        onComplete={() => setShowEmailInput(true)}
                      />
                    )}
              </h2>
              {(showEmailInput || emailSubmitted) && (
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    onKeyDown={handleKeyDown}
                    className="w-full px-10 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                </div>
              )}
              {errors.email && touchedFields.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
          )}
          {step >= 2 && (
            <div className="space-y-2">
              <h2 className="text-l font-bold lg:text-xl text-pink">
                {passwordSubmitted ? (
                  "Your Password"
                ) : (
                  <TypingEffect2
                    text="Great! now, create a password"
                    speed={50}
                  />
                )}
              </h2>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  onKeyDown={handleKeyDown}
                  className="w-full px-10 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
                  placeholder="Shhh! this is super secret"
                />
                <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              </div>
              {errors.password && touchedFields.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          )}
          {step >= 3 && (
            <div className="space-y-2">
              <h2 className="text-l font-bold lg:text-xl text-pink">
                <TypingEffect2
                  text="Almost there! Confirm your password to lock it in"
                  speed={50}
                />
              </h2>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  onKeyDown={handleKeyDown}
                  className="w-full px-10 py-2 border text-white border-green bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
                  placeholder="Confirm your password"
                />
                <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              </div>
              {errors.confirmPassword && touchedFields.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}
          {step >= 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("agreeToTerms")}
                  id="agreeToTerms"
                  className="w-4 h-4 text-green border-green rounded focus:ring-pink"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="text-white text-sm"
                >
                  I understand these credentials will be essential until the hackathon ends, and I
                  will make sure not to forget them.
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500">{errors.agreeToTerms.message}</p>
              )}
            </div>
          )}
          {showEmailInput && step < 3 ? (
            <button
              type="button"
              onClick={handleContinue}
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-deeppink rounded-md hover:text-black hover:bg-pink transition-all focus:outline-none focus:ring-2 focus:ring-deeppink focus:ring-offset-2"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            step === 3 && (
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-deeppink rounded-md hover:bg-pink transition-all hover:text-black focus:outline-none focus:ring-2 focus:ring-deeppink focus:ring-offset-2"
              >
                Sign up
              </button>
            )
          )}
        </form>
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/login"
          className="text-pink hover:text-deeppink transition-colors duration-200"
        >
          Already registered?{" "}
          <span className="text-green">Click here to Login</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisPage;