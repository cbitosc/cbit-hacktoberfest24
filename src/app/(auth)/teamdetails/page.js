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
import { User, Code, Users, Edit, FileText, Github } from "lucide-react";
import "../styles/registration.css";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";



export default function TeamDetails() {
  const [user, loading] = useAuthState(auth);
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isTeamLeader, setIsTeamLeader] = useState(true);
  const [problemStatement, setProblemStatement] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!user) return;

      try {
        // First, try to find the user in participants collection
        const participantsQuery = query(
          collection(db, "participants"),
          where("email", "==", user.email)
        );
        const participantSnapshot = await getDocs(participantsQuery);
        
        if (participantSnapshot.empty) {
          // Check if user is a team leader directly
          const teamDoc = await getDoc(doc(db, "teams", user.uid));
          if (teamDoc.exists()) {
            const data = teamDoc.data();
            setTeamData(data);
            setIsTeamLeader(true);
            
            // Fetch problem statement if it exists
            if (data.problemStatement) {
              const problemStatementDoc = await getDoc(doc(db, "problemStatements", data.problemStatement));
              if (problemStatementDoc.exists()) {
                setProblemStatement(problemStatementDoc.data());
              }
            }
            return;
          }
          
          // If we reach here, user is not registered
          toast.error("Registrations closed");
          router.push("/register");
          return;
        }

        // User found in participants, now find their team
        const userEmail = user.email;
        const teamsQuery = query(
          collection(db, "teams"),
          where("participants", "array-contains", {
            email: userEmail
          })
        );
        
        const teamsSnapshot = await getDocs(teamsQuery);
        
        if (teamsSnapshot.empty) {
          // Try alternative query for nested participant objects
          const allTeamsQuery = query(collection(db, "teams"));
          const allTeamsSnapshot = await getDocs(allTeamsQuery);
          
          let userTeam = null;
          allTeamsSnapshot.forEach((doc) => {
            const team = doc.data();
            if (team.participants.some(p => p.email === userEmail)) {
              userTeam = { ...team, id: doc.id };
            }
          });

          if (!userTeam) {
            toast.error("Team not found.");
            router.push("/register");
            return;
          }

          setTeamData(userTeam);
          setIsTeamLeader(userTeam.participants.find(p => p.email === userEmail)?.isTeamLeader || false);

          // Fetch problem statement if it exists
          if (userTeam.problemStatement) {
            const problemStatementDoc = await getDoc(doc(db, "problemStatements", userTeam.problemStatement));
            if (problemStatementDoc.exists()) {
              setProblemStatement(problemStatementDoc.data());
            }
          }
        } else if (teamsSnapshot.size > 1) {
          toast.error("User found in multiple teams. Please contact support.");
        } else {
          const teamData = teamsSnapshot.docs[0].data();
          setTeamData(teamData);
          setIsTeamLeader(teamData.participants.find(p => p.email === userEmail)?.isTeamLeader || false);

          // Fetch problem statement if it exists
          if (teamData.problemStatement) {
            const problemStatementDoc = await getDoc(doc(db, "problemStatements", teamData.problemStatement));
            if (problemStatementDoc.exists()) {
              setProblemStatement(problemStatementDoc.data());
            }
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

	const handleSelectProblemStatement = () => {
		router.push("/problemstatements");
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

	const formatTeamNumber = (number) => {
		if (!number) return null;
		return number.toString().padStart(3, '0');
	  };
	
	  // Function to handle GitHub repo redirect
	  const handleGitHubRedirect = () => {
		if (!teamData.teamNumber) return;
		const formattedNumber = formatTeamNumber(teamData.teamNumber);
		window.open(`https://github.com/cbitosc/HTF24-Team-${formattedNumber}`, '_blank');
	  };
	

	return (
		<div className="min-h-screen background-gradient bg-darkgrey py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glassomorphism mt-14 backdrop-blur-md rounded-lg shadow p-6 space-y-8"
        >
          <div className="border-b border-green pb-4">
            <div className="flex items-center justify-between">
             
              <span className="text-pink font-semibold bg-pink/10 px-4 py-2 rounded-lg">
                Team #{teamData.teamNumber || "N/A"}
				<h1 className="text-3xl font-bold text-green flex items-center">
                <Users className="mr-2" />
                {teamData.teamName}
              </h1>
              </span>
			 
			  {teamData.teamNumber && (
                  <button
                    onClick={handleGitHubRedirect}
                    className="flex items-center gap-2 bg-black text-white border-white border-[1px] px-4 py-2 rounded-lg hover:bg-darkgrey transition-colors duration-200"
                  >
                    <Github className="w-5 h-5" />
                    Team GitHub Repo
                  </button>
                )}
            </div>
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

					<div className="space-y-4">
  <h2 className="text-xl font-semibold text-green flex items-center">
    <FileText className="mr-2" />
    Problem Statement
  </h2>
  {problemStatement ? (
    <div className="bg-black/30 rounded-lg p-4 border border-green">
      <h3 className="text-lg font-semibold text-pink mb-2">
        {problemStatement.title}
      </h3>
      <p className="text-white">{problemStatement.shortDescription}</p>
    </div>
  ) : (
    <div className="space-y-2">
      <p className="text-pink">No problem statement selected yet.</p>
      {isTeamLeader ? (
        <button
          onClick={handleSelectProblemStatement}
          className="w-full bg-green text-darkgreen px-4 py-2 rounded-md hover:bg-darkgreen hover:text-green transition-colors duration-200 flex items-center justify-center"
        >
          <FileText className="mr-2" />
          Select Problem Statement
        </button>
      ) : (
        <button
          onClick={handleSelectProblemStatement}
          className="w-full bg-green text-darkgreen px-4 py-2 rounded-md hover:bg-darkgreen hover:text-green transition-colors duration-200 flex items-center justify-center"
        >
          <FileText className="mr-2" />
          View Problem Statements
        </button>
      )}
    </div>
  )}
</div>

					

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