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
	const [isTeamLeader, setIsTeamLeader] = useState(true);

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
				} else {
					// see if the user has been registered in another team
					const userDoc = await getDocs(
						query(
							collection(db, "participants"),
							where("email", "==", user.email)
						)
					);
					if (!userDoc.empty) {
						console.log("User is not team leader", user, userDoc);
						toast("You have been registered by your team leader.", {
							icon: "🙌",
						});
						setIsTeamLeader(false);
						// fetch team data
						userDoc.forEach(async (participant) => {
							const teamId = participant.data().teamId;
							const teamDocRef = doc(db, "teams", teamId);
							const teamDoc = await getDoc(teamDocRef);
							setTeamData(teamDoc.data());
						});
					} else {
						toast("Please complete your registration first.");
						router.push("/registration");
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
	}, [user]);

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
							{teamData.updatedAt && (
								<span className="text-pink/60">
									{" "}
									(Updated on{" "}
									{teamData.updatedAt
										.toDate()
										.toLocaleDateString()}
									)
								</span>
							)}
						</p>
					</div>

					{isTeamLeader ? (
						teamData.editCount && teamData.editCount >= 3 ? (
							<p className="text-pink">
								You have reached the maximum number of updates.
								If you need to make any changes, please contact{" "}
								<span className="text-white">
									Mohammed Imaduddin{" "}
								</span>
								<a
									href="tel:9052812005"
									className="text-green hover:text-pink transition-colors"
								>
									+919052812005
								</a>
							</p>
						) : (
							<>
								<button
									onClick={handleUpdateClick}
									className="w-full bg-deeppink hover:bg-pink text-white px-4 py-2 rounded-md hover:bg-darkpink transition-colors duration-200 flex items-center justify-center"
								>
									<Edit className="mr-2" />
									Update Team Details
								</button>
								<p className="text-pink">
									(You can update upto{" "}
									{teamData.editCount
										? 3 - teamData.editCount
										: "3"}{" "}
									more{" "}
									{teamData.editCount === 2
										? "time"
										: "times"}
									)
								</p>
							</>
						)
					) : (
						<p className="text-pink/60">
							(Only team leader can update the team details. If
							you need to make any changes, please contact your
							team leader.)
						</p>
					)}

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
							{teamData.techStack
								.filter((tech) => tech !== "Other")
								.map((tech, index) => (
									<span
										key={index}
										className="bg-green/20 text-green px-3 py-1 rounded-full text-sm"
									>
										{tech}
									</span>
								))}
							{teamData.otherTechStack &&
								teamData.otherTechStack
									.split(",")
									.map((tech, index) => (
										<span
											key={`other-${index}`}
											className="bg-green/20 text-green px-3 py-1 rounded-full text-sm"
										>
											{tech.trim()}
										</span>
									))}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
