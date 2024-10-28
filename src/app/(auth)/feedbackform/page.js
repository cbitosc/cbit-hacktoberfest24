"use client"

import React, { useState } from 'react';
import { auth, db } from "@/app/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import TypingEffect2 from "@/app/TypingEffect2";
import { MessageSquare, Star, Monitor, Award, ThumbsUp, CheckCircle } from "lucide-react";
import "../styles/registration.css";
import toast, { Toaster } from "react-hot-toast";

const FeedbackForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [overallExperience, setOverallExperience] = useState(0);
  const [overallExperienceDetail, setOverallExperienceDetail] = useState('');
  const [doubtsClarification, setDoubtsClarification] = useState(0);
  const [doubtsClarificationDetail, setDoubtsClarificationDetail] = useState('');
  const [problemStatementQuality, setProblemStatementQuality] = useState(0);
  const [problemStatementDetail, setProblemStatementDetail] = useState('');
  const [websiteUX, setWebsiteUX] = useState(0);
  const [websiteUXDetail, setWebsiteUXDetail] = useState('');
  const [judgingProcess, setJudgingProcess] = useState(0);
  const [judgingProcessDetail, setJudgingProcessDetail] = useState('');
  const [improvements, setImprovements] = useState('');
  const [complaints, setComplaints] = useState('');

  const validateForm = () => {
    const requiredRatings = [
      { value: overallExperience, name: 'Overall Experience' },
      { value: doubtsClarification, name: 'Doubts Clarification' },
      { value: problemStatementQuality, name: 'Problem Statement Quality' },
      { value: websiteUX, name: 'Website UX' },
      { value: judgingProcess, name: 'Judging Process' }
    ];

    const missingRatings = requiredRatings
      .filter(rating => rating.value === 0)
      .map(rating => rating.name);

    if (missingRatings.length > 0) {
      toast.error(`Please provide ratings for: ${missingRatings.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await addDoc(collection(db, 'feedback'), {
        overallExperience,
        overallExperienceDetail,
        doubtsClarification,
        doubtsClarificationDetail,
        problemStatementQuality,
        problemStatementDetail,
        websiteUX,
        websiteUXDetail,
        judgingProcess,
        judgingProcessDetail,
        improvements,
        complaints,
        timestamp: new Date(),
      });
      toast.success('Feedback submitted successfully!');
      setIsSubmitted(true);
    } catch (error) {
      toast.error(`Error submitting feedback: ${error.message}`);
    }
  };

  const renderRatingButtons = (value, setter, name) => (
    <div className="grid grid-cols-5 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => setter(num)}
          className={`px-4 py-2 border ${
            value === num 
              ? "bg-green text-darkgreen border-green" 
              : "border-green text-white bg-transparent hover:bg-pink hover:border-pink"
          } rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-transparent`}
        >
          {num}
        </button>
      ))}
    </div>
  );

  const renderFollowUpQuestion = (rating, detail, setDetail, highScoreQuestion, lowScoreQuestion) => {
    if (!rating) return null;
    
    const isHighScore = rating >= 7;
    return (
      <div className="mt-2 relative">
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="w-full px-10 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink min-h-[120px]"
          placeholder={`${isHighScore ? highScoreQuestion : lowScoreQuestion} (Optional)`}
        />
        <MessageSquare className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
      </div>
    );
  };

  const ThankYouMessage = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="w-24 h-24 text-green" />
      </div>
      <h2 className="text-3xl font-bold text-green">Thank You for Your Feedback!</h2>
      <p className="text-xl text-white">
        Your feedback is valuable and will help us improve future events.
      </p>
      <div className="text-pink text-lg">
        We appreciate you taking the time to share your thoughts with us.
      </div>
    </div>
  );

  return (
    <div className="background-gradient flex flex-col items-center justify-center min-h-screen bg-darkgrey px-2 pt-20">
      <div className="w-full max-w-2xl p-8 space-y-8 glassomorphism rounded-lg shadow">
        <h2 className="text-xl font-bold lg:text-3xl text-green">
          <TypingEffect2
            text="CBIT Hacktoberfest Hackathon 2024 feedback form"
            speed={50}
            onComplete={() => setShowForm(true)}
          />
        </h2>
        
        {showForm && !isSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... Rest of the form code remains the same ... */}
            {/* Copy all the form fields from the original code here */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold lg:text-xl text-pink flex items-center">
                  How was your experience with the overall conduction of the hackathon?
                  <span className="text-red-500 ml-1">*</span>
                </h2>
                <div className="relative">
                  {renderRatingButtons(overallExperience, setOverallExperience, "overall-experience")}
                  {renderFollowUpQuestion(
                    overallExperience,
                    overallExperienceDetail,
                    setOverallExperienceDetail,
                    "What aspects of the hackathon were particularly well executed?",
                    "What specific areas of the hackathon need improvement?"
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold lg:text-xl text-pink flex items-center">
                  On a scale of 1-10, how well were your doubts/queries clarified?
                  <span className="text-red-500 ml-1">*</span>
                </h2>
                <div className="relative">
                  {renderRatingButtons(doubtsClarification, setDoubtsClarification, "doubts-clarification")}
                  {renderFollowUpQuestion(
                    doubtsClarification,
                    doubtsClarificationDetail,
                    setDoubtsClarificationDetail,
                    "What made the doubt resolution process effective?",
                    "How could we improve our query resolution process?"
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold lg:text-xl text-pink flex items-center">
                  On a scale of 1-10, what was the quality of the problem statements?
                  <span className="text-red-500 ml-1">*</span>
                </h2>
                <div className="relative">
                  {renderRatingButtons(problemStatementQuality, setProblemStatementQuality, "problem-quality")}
                  {renderFollowUpQuestion(
                    problemStatementQuality,
                    problemStatementDetail,
                    setProblemStatementDetail,
                    "What made the problem statements particularly effective?",
                    "How could the problem statements be improved?"
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold lg:text-xl text-pink flex items-center">
                  On a scale of 1-10, how was the user experience on the website?
                  <span className="text-red-500 ml-1">*</span>
                </h2>
                <div className="relative">
                  {renderRatingButtons(websiteUX, setWebsiteUX, "website-ux")}
                  {renderFollowUpQuestion(
                    websiteUX,
                    websiteUXDetail,
                    setWebsiteUXDetail,
                    "What aspects of the website worked particularly well?",
                    "What specific aspects of the website could be improved?"
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold lg:text-xl text-pink flex items-center">
                  On a scale of 1-10, how was your experience with the judging process?
                  <span className="text-red-500 ml-1">*</span>
                </h2>
                <div className="relative">
                  {renderRatingButtons(judgingProcess, setJudgingProcess, "judging-process")}
                  {renderFollowUpQuestion(
                    judgingProcess,
                    judgingProcessDetail,
                    setJudgingProcessDetail,
                    "What aspects of the judging process were particularly fair and effective?",
                    "What specific improvements would you suggest for the judging process?"
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold lg:text-xl text-pink">
                  What is something that the OC could've improved on? (Optional)
                </h2>
                <div className="relative">
                  <textarea
                    value={improvements}
                    onChange={(e) => setImprovements(e.target.value)}
                    className="w-full px-10 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink min-h-[100px]"
                    placeholder="What could we improve?"
                  />
                  <MessageSquare className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold lg:text-xl text-pink">
                  Do you have any complaints? (Optional)
                </h2>
                <div className="relative">
                  <textarea
                    value={complaints}
                    onChange={(e) => setComplaints(e.target.value)}
                    className="w-full px-10 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink min-h-[100px]"
                    placeholder="Share your concerns..."
                  />
                  <MessageSquare className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green rounded-md hover:bg-pink transition-all focus:outline-none focus:ring-2 focus:ring-deeppink focus:ring-offset-2"
            >
              Submit Feedback
            </button>
          </form>
        )}

        {isSubmitted && <ThankYouMessage />}
      </div>
      <Toaster />
    </div>
  );
};

export default FeedbackForm;