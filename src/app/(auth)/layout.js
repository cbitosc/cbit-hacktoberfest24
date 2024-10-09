"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	query,
	collection,
	where,
	getDocs,
} from "firebase/firestore";
import { auth } from "@/app/firebase";
import { toast } from "react-hot-toast";
import "./styles/registration.css";

export default function RegisterPageLayout({ children }) {
	const router = useRouter();
	const pathname = usePathname();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const db = getFirestore();

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				user.reload();
				if (!user.emailVerified) {
					if (pathname !== "/verifyemail") {
						toast("Please verify your email first.", {
							icon: "📧",
						});
						router.replace("/verifyemail");
					}
				} else {
					if (pathname === "/verifyemail") {
						toast("Email verified successfully.", { icon: "📧" });
						router.replace("/registration");
					}
					// User is logged in
					const userDocRef = doc(db, "teams", user.uid);
					const userDocSnap = await getDoc(userDocRef);

					if (userDocSnap.exists()) {
						// Document exists, redirect to team details
						if (pathname === "/registration") {
							toast("You have already registered");
							router.replace("/teamdetails");
						} else if (
							pathname === "/login" ||
							pathname === "/register"
						) {
							toast(
								"You have already logged in and registered. Redirecting you to team details.",
								{ icon: "📝" }
							);
							router.replace("/teamdetails");
						}
					} else {
						// Find if user is a participant
						const participantDoc = await getDocs(
							query(
								collection(db, "participants"),
								where("email", "==", user.email)
							)
						);
						// Check if user is a participant (not a team leader)
						if (!participantDoc.empty) {
							router.replace("/teamdetails");
						} else if (pathname !== "/registration") {
							toast("Please complete your registration.", {
								icon: "📝",
							});
							router.replace("/registration");
						}
					}
				}
			} else {
				// User is not logged in
				if (pathname !== "/register" && pathname !== "/login") {
					toast("Please signup or login.", { icon: "🔏" });
					router.replace("/register");
				}
			}
			setLoading(false);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [router, pathname]);

	if (loading) {
		return (
			<section className="bg-darkgrey background-gradient video-background h-screen flex flex-col items-center justify-center">
				<span className="loader"></span>
			</section>
		);
	}

	return children;
}
