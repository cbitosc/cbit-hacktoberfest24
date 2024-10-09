"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import TypingEffect2 from "@/app/TypingEffect2";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/registration.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase";
import {
	doc,
	query,
	where,
	getDocs,
	setDoc,
	collection,
	addDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import RegistrationPopup from "./registrationpopup";
import { useAuth } from "@/utils/contexts/AuthContext";

const useExpandedIndex = () => {
	const [expandedIndex, setExpandedIndex] = useState(0);
	return { expandedIndex, setExpandedIndex };
};

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-darkgrey border border-green rounded-lg p-6 max-w-sm w-full">
				<h2 className="text-white text-lg font-semibold mb-4">
					{message}
				</h2>
				<div className="flex justify-end space-x-4">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default function RegisterForm() {
	const { expandedIndex, setExpandedIndex } = useExpandedIndex();
	const [user, loading] = useAuthState(auth);
	const router = useRouter();
	const { setIsRegistered, isRegistered } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [participantToRemove, setParticipantToRemove] = useState(null);

	useEffect(() => {
		if (isRegistered) {
			router.push("/teamdetails");
		}
	}, [isRegistered, router]);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		defaultValues: {
			teamName: "",
			techStack: [],
			otherTechStack: "",
			participants: [
				{
					name: "",
					phone: "",
					email: user?.email || "",
					gender: "",
					rollNo: "",
					institution: "",
					otherInstitution: "",
					yearOfStudy: "",
					otherYearOfStudy: "",
					branch: "",
					otherBranch: "",
					section: "",
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "participants",
	});

	const checkDuplicateEmails = async (participants) => {
		const participantsCollection = collection(db, "participants");
		const duplicateEmails = [];

		// for (let i = 0; i < participants.length; i++) {
		// 	const participant = participants[i];
		// 	const emailQuery = query(
		// 		participantsCollection,
		// 		where("email", "==", participant.email)
		// 	);
		// 	const querySnapshot = await getDocs(emailQuery);

		// 	if (!querySnapshot.empty) {
		// 		duplicateEmails.push({ index: i, email: participant.email });
		// 	}
		// }
		const dupEmailDocs = query(
			participantsCollection,
			where(
				"email",
				"in",
				participants.map((p) => p.email)
			)
		);
		const dupEmailSnap = await getDocs(dupEmailDocs);
		dupEmailSnap.forEach((doc) => {
			const participant = participants.find(
				(p) => p.email === doc.data().email
			);
			const index = participants.indexOf(participant);
			duplicateEmails.push({ index, email: participant.email });
		});

		return duplicateEmails;
	};

	const validateForm = (data) => {
		const errors = [];

		if (data.teamName.trim().length < 2) {
			errors.push("Team name must be at least 2 characters");
		}

		if (data.techStack.length === 0) {
			errors.push("Please select at least one tech stack");
		}

		if (data.participants.length === 0) {
			errors.push("At least one participant is required");
		}

		if (data.participants.length > 5) {
			errors.push("Maximum 5 participants allowed");
		}

		if (
			data.techStack.includes("Other") &&
			data.otherTechStack.trim().length < 2
		) {
			errors.push(
				"Please specify other tech stack (at least 2 characters)"
			);
		}

		data.participants.forEach((participant, index) => {
			if (participant.name.trim().length < 2) {
				errors.push(
					`Participant ${
						index + 1
					}: Name must be at least 2 characters`
				);
			}

			if (!/^\d{10}$/.test(participant.phone.trim())) {
				errors.push(
					`Participant ${index + 1}: Phone number must be 10 digits`
				);
			}

			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participant.email.trim())) {
				errors.push(`Participant ${index + 1}: Invalid email address`);
			}

			if (
				data.participants.filter(
					(p) => p.email.trim() === participant.email.trim()
				).length > 1
			) {
				errors.push(
					`Participant ${index + 1}: Duplicate email address`
				);
			}

			if (!participant.gender) {
				errors.push(`Participant ${index + 1}: Please select gender`);
			}

			if (!participant.rollNo.trim()) {
				errors.push(
					`Participant ${index + 1}: Roll number is required`
				);
			}

			if (!participant.institution) {
				errors.push(
					`Participant ${index + 1}: Please select college/university`
				);
			}

			if (
				participant.institution === "other" &&
				!participant.otherInstitution.trim()
			) {
				errors.push(
					`Participant ${index + 1}: Please specify other institution`
				);
			}

			if (!participant.yearOfStudy) {
				errors.push(
					`Participant ${index + 1}: Please enter year of study`
				);
			}

			if (!participant.branch) {
				errors.push(`Participant ${index + 1}: Please select branch`);
			}

			if (
				participant.branch === "other" &&
				!participant.otherBranch.trim()
			) {
				errors.push(
					`Participant ${index + 1}: Please specify other branch`
				);
			}

			if (!participant.section.trim()) {
				errors.push(`Participant ${index + 1}: Please select section`);
			}
		});

		return errors;
	};

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		const trimmedData = {
			...data,
			teamName: data.teamName.trim(),
			otherTechStack: data.otherTechStack.trim(),
			participants: data.participants.map((participant) => ({
				...participant,
				name: participant.name.trim(),
				phone: participant.phone.trim(),
				email: participant.email.trim(),
				rollNo: participant.rollNo.trim(),
				otherInstitution: participant.otherInstitution?.trim() || "",
				otherYearOfStudy: participant.otherYearOfStudy?.trim() || "",
				otherBranch: participant.otherBranch?.trim() || "",
				section: participant.section.trim(),
			})),
		};

		const validationErrors = validateForm(trimmedData);

		if (validationErrors.length > 0) {
			const fewErrors = validationErrors.slice(0, 3);
			if (validationErrors.length > 3) {
				toast.error(`And ${validationErrors.length - 3} more...`);
			}
			fewErrors.forEach((error) => toast.error(error));
			setIsSubmitting(false);
			return;
		}

		try {
			if (!user) {
				toast.error("You must be logged in to register a team");
				setIsSubmitting(false);
				return;
			}

			// Check for duplicate emails
			const duplicateEmails = await checkDuplicateEmails(
				trimmedData.participants
			);
			if (duplicateEmails.length > 0) {
				duplicateEmails.forEach(({ index, email }) => {
					toast.error(
						`Participant ${
							index + 1
						}: ${email} is already registered for the hackathon`
					);
				});
				setIsSubmitting(false);
				return;
			}

			const enrichedParticipants = trimmedData.participants.map(
				(participant, index) => ({
					...participant,
					isTeamLeader: index === 0,
					createdAt: new Date(),
					participantId: `participant_${index + 1}`,
				})
			);

			const teamDocRef = doc(db, "teams", user.uid);
			const teamData = {
				teamName: trimmedData.teamName,
				techStack: trimmedData.techStack,
				otherTechStack: trimmedData.otherTechStack,
				createdAt: new Date(),
				teamLeaderId: user.uid,
				participants: enrichedParticipants,
				totalParticipants: enrichedParticipants.length,
				editCount: 0,
			};
			await setDoc(teamDocRef, teamData);

			const participantsCollection = collection(db, "participants");
			const participantPromises = enrichedParticipants.map(
				async (participant) => {
					return addDoc(participantsCollection, {
						...participant,
						teamId: user.uid,
						teamName: trimmedData.teamName,
					});
				}
			);

			await Promise.all(participantPromises);

			toast.success("Registration successful!");
			setIsRegistered(true);
			router.push("/teamdetails");
		} catch (error) {
			console.error("Error saving registration:", error);
			toast.error("Registration failed. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const addParticipant = () => {
		if (fields.length < 5) {
			append({
				name: "",
				phone: "",
				email: "",
				gender: "",
				rollNo: "",
				institution: "",
				otherInstitution: "",
				yearOfStudy: "",
				branch: "",
				otherBranch: "",
				section: "",
			});
			setExpandedIndex(fields.length);
		}
	};

	const removeParticipant = (index) => {
		if (fields.length > 1) {
			remove(index);
			setExpandedIndex(Math.max(0, index - 1));
		}
	};

	const handleRemoveClick = (index) => {
		setParticipantToRemove(index);
		setDialogOpen(true);
	};

	const handleConfirmRemove = () => {
		if (participantToRemove !== null) {
			removeParticipant(participantToRemove);
		}
		setDialogOpen(false);
		setParticipantToRemove(null);
	};

	const toggleExpand = (index) => {
		setExpandedIndex(expandedIndex === index ? -1 : index);
	};

	const techStacks = [
		"Frontend Development",
		"Backend Development",
		"UI/UX",
		"Machine Learning and Artificial Intelligence",
		"Other",
		"None",
	];

	const ParticipantCard = React.memo(({ index }) => {
		const isExpanded = expandedIndex === index;

		React.useEffect(() => {
			if (index === 0 && user?.email) {
				setValue(`participants.${index}.email`, user.email);
			}
		}, [user, index, setValue]);

		return (
			<div className="mb-4 glassomorphism background-gradient rounded-md overflow-hidden">
				<div
					className="p-4 flex justify-between items-center cursor-pointer"
					onClick={() => toggleExpand(index)}
				>
					<h3 className="text-l font-bold text-pink">
						{index === 0
							? "Team Leader"
							: `Participant ${index + 1}`}
					</h3>
					{isExpanded ? (
						<ChevronUp className="text-pink" />
					) : (
						<ChevronDown className="text-pink" />
					)}
				</div>

				<AnimatePresence>
					{isExpanded && (
						<motion.div
							className="p-4 space-y-4"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
						>
							{/* Name input */}
							<div className="relative">
								<input
									{...register(`participants.${index}.name`)}
									placeholder="Name"
									className="w-full px-3 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
								/>
							</div>

							{/* Phone input */}
							<div className="relative">
								<input
									{...register(`participants.${index}.phone`)}
									placeholder="Phone"
									className="w-full px-3 py-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
								/>
							</div>

							{/* Email input */}
							<div className="relative">
								{index === 0 ? (
									<input
										value={user?.email || ""}
										disabled
										className="w-full px-3 py-2 border border-green bg-transparent text-white rounded-md cursor-not-allowed"
									/>
								) : (
									<input
										{...register(
											`participants.${index}.email`
										)}
										placeholder="Email"
										className="w-full px-3 py-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
									/>
								)}
							</div>

							{/* Gender select */}
							<div className="relative">
								<select
									{...register(
										`participants.${index}.gender`
									)}
									className="w-full px-3 py-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
								>
									<option
										className="text-darkgrey hover:text-white"
										value=""
										disabled
									>
										Select Gender
									</option>
									<option
										className="text-darkgrey hover:text-white"
										value="Male"
									>
										Male
									</option>
									<option
										className="text-darkgrey hover:text-white"
										value="Female"
									>
										Female
									</option>
									<option
										className="text-darkgrey hover:text-white"
										value="Other"
									>
										Other
									</option>
								</select>
							</div>

							{/* Roll Number input */}
							<div className="relative">
								<input
									{...register(
										`participants.${index}.rollNo`
									)}
									placeholder="Roll Number"
									className="w-full px-3 py-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
								/>
							</div>

							{/* Institution select and other input */}
							<div className="relative">
								<Controller
									name={`participants.${index}.institution`}
									control={control}
									render={({ field }) => (
										<>
											<select
												{...field}
												className="w-full px-3 py-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
											>
												<option
													className="text-darkgrey hover:text-white"
													value=""
													disabled
												>
													Select College/University
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="CBIT"
												>
													CBIT
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="other"
												>
													Other (Specify)
												</option>
											</select>
											{field.value === "other" && (
												<input
													{...register(
														`participants.${index}.otherInstitution`
													)}
													placeholder="Specify other institution"
													className="w-full px-3 py-2 mt-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
												/>
											)}
										</>
									)}
								/>
							</div>

							{/* Year of Study input */}
							<div className="relative">
								<Controller
									name={`participants.${index}.yearOfStudy`}
									control={control}
									render={({ field }) => (
										<>
											<select
												{...field}
												className="w-full px-3 py-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
											>
												<option
													className="text-darkgrey hover:text-white"
													value=""
													disabled
												>
													Select Year of Study
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="1"
												>
													1
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="2"
												>
													2
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="3"
												>
													3
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="4"
												>
													4
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="other"
												>
													Other
												</option>
											</select>
											{field.value === "other" && (
												<input
													{...register(
														`participants.${index}.otherYearOfStudy`
													)}
													placeholder="Specify other year of study"
													className="w-full px-3 py-2 mt-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
												/>
											)}
										</>
									)}
								/>
							</div>

							{/* Branch select and other input */}
							<div className="relative">
								<Controller
									name={`participants.${index}.branch`}
									control={control}
									render={({ field }) => (
										<>
											<select
												{...field}
												className="w-full px-3 py-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
											>
												<option
													className="text-darkgrey hover:text-white"
													value=""
													disabled
												>
													Select Branch
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="CSE"
												>
													CSE
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="CSE AI & ML"
												>
													CSE AI & ML
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="CET"
												>
													CET
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="IT"
												>
													IT
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="AIDS"
												>
													AI&DS
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="AIML"
												>
													AIML
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="CIVIL"
												>
													CIVIL
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="MECHANICAL"
												>
													MECHANICAL
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="ECE"
												>
													ECE
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="EEE"
												>
													EEE
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="CHEMICAL"
												>
													CHEMICAL
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="BIOTECH"
												>
													BIOTECH
												</option>
												<option
													className="text-darkgrey hover:text-white"
													value="other"
												>
													Other (Specify)
												</option>
											</select>
											{field.value === "other" && (
												<input
													{...register(
														`participants.${index}.otherBranch`
													)}
													placeholder="Specify other branch"
													className="w-full px-3 py-2 mt-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
												/>
											)}
										</>
									)}
								/>
							</div>

							{/* Section input */}
							<div className="relative">
								<input
									{...register(
										`participants.${index}.section`
									)}
									placeholder="Section"
									className="w-full px-3 py-2 border border-green bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
								/>
							</div>

							{index > 0 && (
								<button
									type="button"
									onClick={() => handleRemoveClick(index)}
									className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors duration-200"
								>
									<Trash2 className="w-5 h-5 mr-2" />
									Remove Participant
								</button>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	});
	return (
		<div className="background-gradient flex flex-col items-center justify-center min-h-screen bg-darkgrey px-2 py-24">
			<RegistrationPopup />
			<div className="w-full max-w-md p-8 space-y-8 glassomorphism rounded-lg shadow">
				<h2 className="text-xl font-bold lg:text-3xl text-green">
					<TypingEffect2 text="Team registration" speed={50} />
				</h2>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="mb-4">
						<label
							htmlFor="teamName"
							className="text-white block mb-2"
						>
							Team Name
						</label>
						<input
							id="teamName"
							{...register("teamName")}
							placeholder="Enter your team name"
							className="w-full px-3 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
						/>
						{errors.teamName && (
							<p className="text-red-500 mt-1">
								{errors.teamName.message}
							</p>
						)}
					</div>

					<div className="space-y-4">
						<h3 className="text-white font-semibold">
							Team Members
						</h3>
						{fields.map((field, index) => (
							<ParticipantCard key={field.id} index={index} />
						))}
					</div>

					{/* Add Participant button */}
					{fields.length < 5 && (
						<button
							type="button"
							onClick={addParticipant}
							className="w-full flex items-center justify-center px-4 py-2 bg-deeppink text-white rounded-md hover:bg-pink transition-colors duration-200"
						>
							<Plus className="w-5 h-5 mr-2" />
							Add Participant
						</button>
					)}

					<div className="mb-6">
						<label className="text-white block mb-2">
							Which of the following tech stacks are you and your
							teammate familiar with?
						</label>
						<AnimatePresence>
							<motion.div className="p-4 border border-green rounded-md">
								<Controller
									name={`techStack`}
									control={control}
									render={({ field }) => (
										<>
											{techStacks.map((stack, idx) => (
												<label
													key={idx}
													className="flex items-center space-x-2"
												>
													<input
														type="checkbox"
														value={stack}
														checked={field.value.includes(
															stack
														)}
														onChange={(e) => {
															let updatedValue;
															if (
																stack === "None"
															) {
																updatedValue = e
																	.target
																	.checked
																	? ["None"]
																	: [];
															} else {
																updatedValue = e
																	.target
																	.checked
																	? [
																			...field.value.filter(
																				(
																					item
																				) =>
																					item !==
																					"None"
																			),
																			stack,
																	  ]
																	: field.value.filter(
																			(
																				item
																			) =>
																				item !==
																				stack
																	  );
															}
															field.onChange(
																updatedValue
															);
														}}
														disabled={
															stack !== "None" &&
															field.value.includes(
																"None"
															)
														}
														className="form-checkbox"
													/>
													<span className="text-white">
														{stack}
													</span>
												</label>
											))}
											{field.value.includes("Other") && (
												<input
													{...register(
														"otherTechStack"
													)}
													placeholder="Other tech stack(s) comma separated"
													className="mt-2 w-full px-3 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
												/>
											)}
										</>
									)}
								/>
							</motion.div>
						</AnimatePresence>
						{errors.techStack && (
							<p className="text-red-500 mt-1">
								{errors.techStack.message}
							</p>
						)}
					</div>

					<div>
						<button
							type="submit"
							className="w-full bg-green text-darkgreen px-4 py-2 rounded-md hover:bg-darkgreen hover:text-green transition"
							disabled={isSubmitting}
						>
							{isSubmitting
								? "Submitting..."
								: "Submit Registration"}
						</button>
					</div>
				</form>
				<div className="mt-6 text-center space-y-2">
					<p className="text-white">Need help?</p>
					<p>
						<span className="text-white">
							Contact Mohammed Imaduddin{" "}
						</span>
						<a
							href="tel:9052812005"
							className="text-green hover:text-pink transition-colors"
						>
							+919052812005
						</a>
					</p>
				</div>
			</div>
			{isSubmitting && (
				<div className="fixed inset-0 z-50 flex items-center justify-center glassomorphism">
					<span className="loader"></span>
				</div>
			)}

			<ConfirmationDialog
				isOpen={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onConfirm={handleConfirmRemove}
				message="Are you sure you want to remove this participant? This action cannot be undone."
			/>
		</div>
	);
}
