"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import TypingEffect2 from "@/app/TypingEffect2";
import { db, auth } from '../../firebase';
import { collection, doc, getDocs, getDoc, query, runTransaction, where, onSnapshot, setDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/registration.css"

const Prob = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemStatements, setProblemStatements] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [userTeamId, setUserTeamId] = useState(null);
  const [hasSelectedProblem, setHasSelectedProblem] = useState(false);
  const [showOnlyBeginner, setShowOnlyBeginner] = useState(false);
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCurrentTeamId = async (userEmail) => {
    try {
      const participantsSnapshot = await getDocs(
        query(collection(db, "participants"), 
        where("email", "==", userEmail))
      );
      
      if (!participantsSnapshot.empty) {
        const participantData = participantsSnapshot.docs[0].data();
        return {
          teamId: participantData.teamId,
          isLeader: participantData.isTeamLeader || false
        };
      }
      return null;
    } catch (error) {
      console.error("Error getting current team ID:", error);
      return null;
    }
  };

  useEffect(() => {
    let unsubscribe;
    let problemsUnsubscribe;

    const initializeData = async () => {
      try {
        // Set up problem statements listener
        // Set up problem statements listener
        const problemsQuery = query(collection(db, "problemStatements"));
        problemsUnsubscribe = onSnapshot(problemsQuery, (querySnapshot) => {
          const problems = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            number: doc.data().number || 0,
            teams: doc.data().teams || [],
            count: doc.data().teams ? doc.data().teams.length : 0
          })).sort((a, b) => a.number - b.number);
          
          setProblemStatements(problems);
          setLoading(false);
        });

        // Set up auth state listener with merged team handling
        unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setIsLoggedIn(true);
            try {
              const teamInfo = await getCurrentTeamId(user.email);
              
              if (teamInfo) {
                setUserTeamId(teamInfo.teamId);
                setIsTeamLeader(teamInfo.isLeader);
                
                // Check if team has a problem statement
                const teamDoc = await getDoc(doc(db, "teams", teamInfo.teamId));
                if (teamDoc.exists() && teamDoc.data().problemStatement) {
                  setHasSelectedProblem(true);
                }
              }
            } catch (error) {
              console.error("Error checking user status:", error);
              toast.error("Error loading user data");
            }
          } else {
            resetUserState();
          }
        });
      } catch (error) {
        console.error("Error in initialization:", error);
        toast.error("An error occurred while loading data");
        setLoading(false);
      }
    };

    initializeData();

    return () => {
      if (unsubscribe) unsubscribe();
      if (problemsUnsubscribe) problemsUnsubscribe();
    };
  }, [router]);

  const resetUserState = () => {
    setIsLoggedIn(false);
    setIsTeamLeader(false);
    setUserTeamId(null);
    setMergedTeamId(null);
    setOriginalTeamId(null);
    setMergedTeamData(null);
    setHasSelectedProblem(false);
  };

  const toggleDescription = (problemId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [problemId]: !prev[problemId]
    }));
  };

  // Add the missing modal functions
  const openModal = (problem) => {
    setSelectedProblem(problem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProblem(null);
    setIsModalOpen(false);
  };

  const selectProblemStatement = async (problem) => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (!isTeamLeader) {
      toast.error("Only team leaders can select problem statements");
      return;
    }

    if (hasSelectedProblem) {
      toast.error("You have already selected a problem statement");
      return;
    }

    try {
      // Get the most current team ID before proceeding
      const currentTeamInfo = await getCurrentTeamId(auth.currentUser.email);
      
      if (!currentTeamInfo || !currentTeamInfo.teamId) {
        toast.error("No team found. Please ensure you are part of a team");
        return;
      }

      if (!currentTeamInfo.isLeader) {
        toast.error("You are no longer the team leader");
        return;
      }

      await runTransaction(db, async (transaction) => {
        // Verify the team exists
        const teamRef = doc(db, "teams", currentTeamInfo.teamId);
        const teamDoc = await transaction.get(teamRef);
        
        if (!teamDoc.exists()) {
          throw "Team does not exist";
        }

        // Check problem statement
        const problemRef = doc(db, "problemStatements", problem.id);
        const problemDoc = await transaction.get(problemRef);
        
        if (!problemDoc.exists()) {
          throw "Problem statement does not exist";
        }

        const problemData = problemDoc.data();
        const currentTeams = problemData.teams || [];
        const currentCount = currentTeams.length;

        if (currentTeams.includes(currentTeamInfo.teamId)) {
          throw "Your team has already selected this problem";
        }

        if (currentCount >= 7) {
          throw "This problem statement has reached maximum team capacity";
        }

        // Update problem statement
        transaction.update(problemRef, {
          teams: [...currentTeams, currentTeamInfo.teamId]
        });

        // Update team
        transaction.update(teamRef, {
          problemStatement: problem.id
        });
      });

      toast.success("Problem statement selected successfully!");
      setHasSelectedProblem(true);
      closeModal();
      router.push("/teamdetails");

    } catch (error) {
      console.error("Error selecting problem statement:", error);
      toast.error(typeof error === 'string' ? error : "Failed to select problem statement");
    }
  };


  const filteredProblems = problemStatements.filter(problem =>
    !showOnlyBeginner || problem.level === "beginner"
  );

  const animationConfig = {
    initial: { 
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    animate: { 
      opacity: 1,
      height: "auto",
      marginTop: 16
    },
    exit: { 
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 200,
      opacity: {
        duration: 0.2
      }
    }
  };

  if (loading) {
    return (
      <section className="bg-darkgrey background-gradient video-background h-screen flex flex-col items-center justify-center">
        <span className="loader"></span>
      </section>
    );
  }

  return (
    <div className="background-gradient flex flex-col items-center min-h-screen bg-darkgrey px-4 py-24">
      <div className="w-full max-w-4xl space-y-8 rounded-lg shadow">
        <h2 className="text-xl font-bold lg:text-3xl text-green">
          <TypingEffect2 text="Problem Statements" speed={50} />
        </h2>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="beginnerFilter"
            checked={showOnlyBeginner}
            onChange={() => setShowOnlyBeginner(!showOnlyBeginner)}
            className="form-checkbox h-5 w-5 text-green"
          />
          <label htmlFor="beginnerFilter" className="text-white">
            Show only Beginner level problems
          </label>
        </div>

        {isLoggedIn && hasSelectedProblem && (
          <div className="p-4 bg-green/10 border border-green rounded-lg">
            <p className="text-green">You have already selected a problem statement. You can view other problems but cannot make another selection.</p>
          </div>
        )}

        {isLoggedIn && !isTeamLeader && (
          <div className="p-4 bg-pink/10 border border-pink rounded-lg">
            <p className="text-pink">You can view problem statements, but only team leaders can make selections.</p>
          </div>
        )}

        {!isLoggedIn && (
          <div className="p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
            <p className="text-blue-500">Log in to select a problem statement for your team.</p>
          </div>
        )}

        <div className="space-y-6">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className="glassomorphism rounded-lg overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                    <span className="text-green font-mono">#{problem.number || 0}</span>
                    {problem.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-4">
                  {problem.level === "beginner" && (
                    <div className="px-3 py-1 bg-green/10 text-green border border-green text-sm rounded-full">
                      Beginner Level
                    </div>
                  )}
                  <div className="text-white">
                    Teams selected: {problem.count}/7
                  </div>
                </div>

                <p className="text-white/80">{problem.shortDescription}</p>

                <div className="space-y-4">
                  <button
                    onClick={() => toggleDescription(problem.id)}
                    className="flex items-center gap-2 text-pink transition-colors"
                  >
                    {expandedDescriptions[problem.id] ? (
                      <>
                        Hide Full Description
                        <ChevronUp className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Show Full Description
                        <ChevronDown className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <AnimatePresence mode="sync">
                    {expandedDescriptions[problem.id] && (
                      <motion.div
                        {...animationConfig}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-black/20 rounded-lg">
                          <ReactMarkdown className="prose prose-invert max-w-none">
                            {problem.fullDescription}
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {(isLoggedIn && isTeamLeader) && (
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => openModal(problem)}
                      disabled={problem.count >= 7 || hasSelectedProblem}
                      className={`px-6 py-2 rounded-md transition-colors ${
                        problem.count >= 7 || hasSelectedProblem
                          ? "bg-gray-500 text-white cursor-not-allowed"
                          : "bg-green text-darkgreen hover:bg-darkgreen hover:text-green"
                      }`}
                    >
                      {problem.count >= 6 ? "Full" : "Select Problem Statement"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProblem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 px-4 z-50">
          <div className="w-full max-w-2xl glassomorphism rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-green">Confirm Problem Statement</h2>
              <span className="font-mono text-green">#{selectedProblem.number || 0}</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{selectedProblem.title}</h3>
              <div>
                <h4 className="text-green font-medium mb-2">Short Description:</h4>
                <p className="text-white/80">{selectedProblem.shortDescription}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white">Teams selected: {selectedProblem.count}/3</span>
              </div>

              {selectedProblem.level === 'beginner' && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green/10 text-green border border-green rounded-full text-sm">
                    Beginner Level
                  </span>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-pink text-white rounded-md hover:bg-deeppink transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => selectProblemStatement(selectedProblem)}
                  disabled={selectedProblem.count >= 7 || hasSelectedProblem}
                  className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                    selectedProblem.count >= 7 || hasSelectedProblem
                      ? "bg-gray-500 text-white cursor-not-allowed"
                      : "bg-green text-darkgreen hover:bg-darkgreen hover:text-green"
                  }`}
                >
                  {hasSelectedProblem 
                    ? "Already Selected" 
                    : selectedProblem.count >= 7 
                      ? "Maximum Teams Reached" 
                      : "Confirm Selection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prob;