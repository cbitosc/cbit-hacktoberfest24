"use client";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase";
import {
	doc,
	getDoc,
	collection,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { User, Code, Users, Edit } from "lucide-react";
import "../styles/registration.css";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SuccessPopup from "../registration/successpopup";

export default function TeamDetails() {
	const [user, loading] = useAuthState(auth);
	const [teamData, setTeamData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchTeamData = async () => {
			if (!user) return;

			try {
				const teamDocRef = doc(db, "teams", user.uid);
				const teamDoc = await getDoc(teamDocRef);

				if (teamDoc.exists()) {
					const data = teamDoc.data();

					// Check for duplicate participants
					const participantEmails = data.participants.map(
						(p) => p.email
					);
					const duplicateQuery = query(
						collection(db, "teams"),
						where(
							"participants",
							"array-contains-any",
							participantEmails
						)
					);
					const duplicateSnapshot = await getDocs(duplicateQuery);

					if (duplicateSnapshot.size > 1) {
						toast.error(
							"One or more participants are registered in multiple teams. This is not allowed."
						);
						setTeamData(null);
						router.push("/registration");
						return;
					}

					setTeamData(data);

					// Check if it's the first time viewing team details
					const hasViewedTeamDetails = localStorage.getItem(
						"hasViewedTeamDetails"
					);
					if (!hasViewedTeamDetails) {
						setShowSuccessPopup(true);
						localStorage.setItem("hasViewedTeamDetails", "true");
					}
				}
			} catch (error) {
				console.error("Error fetching team data:", error);
				toast.error("An error occurred while fetching team data.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchTeamData();
	}, [user, router]);

	const handleUpdateClick = () => {
		router.push("/registration/update");
	};

	if (loading || isLoading) {
		return (
			<section className="bg-darkgrey background-gradient video-background h-screen flex flex-col items-center justify-center">
				<span className="loader"></span>
			</section>
		);
	}

	if (!user) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-darkgrey">
				<div className="text-white text-xl">
					Please log in to view team details
				</div>
			</div>
		);
	}

	if (!teamData) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-darkgrey">
				<div className="text-white text-xl">
					No team registration found
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen background-gradient bg-darkgrey py-12 px-4 sm:px-6 lg:px-8">
			{showSuccessPopup && <SuccessPopup />}
			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="glassomorphism mt-14 backdrop-blur-md rounded-lg shadow p-6 space-y-8"
				>
					<a
						href="https://chat.whatsapp.com/I13Gli1hhE43lx6qiehgSq"
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full mt-6 bg-green text-darkgreen px-4 py-2 rounded-md hover:bg-darkgreen hover:text-green transition-colors duration-200 text-center"
					>
						Join the WhatsApp group for important updates
					</a>
					<div className="border-b border-green pb-4">
						<h1 className="text-3xl font-bold text-green flex items-center">
							<Users className="mr-2" />
							{teamData.teamName}
						</h1>
						<p className="text-pink mt-2">
							Registered on:{" "}
							{teamData.createdAt.toDate().toLocaleDateString()}
						</p>
					</div>

					<button
						onClick={handleUpdateClick}
						className="w-full bg-deeppink hover:bg-pink text-white px-4 py-2 rounded-md hover:bg-darkpink transition-colors duration-200 flex items-center justify-center"
					>
						<Edit className="mr-2" />
						Update Team Details
					</button>

					<div className="space-y-4">
						<h2 className="text-xl font-semibold text-green flex items-center">
							<User className="mr-2" />
							Team Members
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{teamData.participants.map((participant, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										duration: 0.3,
										delay: index * 0.1,
									}}
									className="bg-black/30 rounded-lg p-4 border border-green"
								>
									<h3 className="text-lg font-semibold text-pink mb-2">
										{participant.isTeamLeader
											? "Team Leader"
											: `Member ${index + 1}`}
									</h3>
									<div className="space-y-2 text-white">
										<p>
											<span className="text-green">
												Name:
											</span>{" "}
											{participant.name}
										</p>
										<p>
											<span className="text-green">
												Email:
											</span>{" "}
											{participant.email}
										</p>
										<p>
											<span className="text-green">
												Phone:
											</span>{" "}
											{participant.phone}
										</p>
										<p>
											<span className="text-green">
												Roll No:
											</span>{" "}
											{participant.rollNo}
										</p>
										<p>
											<span className="text-green">
												Institution:
											</span>{" "}
											{participant.institution === "other"
												? participant.otherInstitution
												: participant.institution}
										</p>
										<p>
											<span className="text-green">
												Branch:
											</span>{" "}
											{participant.branch === "other"
												? participant.otherBranch
												: participant.branch}
										</p>
										<p>
											<span className="text-green">
												Year:
											</span>{" "}
											{participant.yearOfStudy}
										</p>
										<p>
											<span className="text-green">
												Section:
											</span>{" "}
											{participant.section}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<h2 className="text-xl font-semibold text-green flex items-center">
							<Code className="mr-2" />
							Tech Stack
						</h2>
						<div className="flex flex-wrap gap-2">
							{teamData.techStack.map((tech, index) => (
								<span
									key={index}
									className="bg-green/20 text-green px-3 py-1 rounded-full text-sm"
								>
									{tech}
								</span>
							))}
							{teamData.taechStack?.includes("Other") &&
								teamData.otherTechStack &&
								new String(teamData.otherTechStack)
									.split(",")
									.map((otherStack) => (
										<span
											key={otherStack}
											className="bg-green/20 text-green px-3 py-1 rounded-full text-sm"
										>
											{otherStack}
										</span>
									))}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
