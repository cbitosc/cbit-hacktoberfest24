"use client";

import React, { useEffect } from "react";
import "./../styles/registration.css";
import toast from "react-hot-toast";
import { useAuth } from "@/utils/contexts/AuthContext";
import { auth } from "@/app/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from 'next/navigation';

export default function VerifyEmail() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) return;

		const checkVerification = setInterval(() => {
			user.reload().then(() => {
				if (user.emailVerified) {
					clearInterval(checkVerification);
					toast.success("Email verified successfully!");
					router.push('/registration');
				}
			});
		}, 3000); // Check every 3 seconds

		return () => clearInterval(checkVerification);
	}, [user, router]);

	return (
		<div className="pb-4 background-gradient min-h-screen flex flex-col items-center justify-center bg-darkgrey px-2">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-4xl font-bold text-white text-center pb-4">
					Verify your email
				</h1>
				<p className="text-white text-center pb-2">
					We've sent you an email on <span className="text-pink">{user?.email}</span>  with a link to verify your address. Just click the link to confirm your email.
				</p>

				{user ? (
					<button
						className="mt-4 bg-green text-white px-4 py-2 rounded-md"
						onClick={() => {
							toast.promise(
								sendEmailVerification(auth.currentUser),
								{
									loading: "Sending verification email...",
									success: () => {
										return "Verification email sent";
									},
									error: (err) => {
										return `Verification email failed: ${err.message}`;
									},
								}
							);
						}}
					>
						Resend
					</button>
				) : null}
			</div>
		</div>
	);
}