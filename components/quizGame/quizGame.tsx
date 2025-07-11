"use client"; // Use client directive for Next.js client components
import React, { useState } from "react";
import QuizHeader from "./quizHeader";
import { bibleQuiz } from "@/data/bibleQuiz";
import Image from "next/image";
import cross from "../../public/Close_round_fill.svg";
import mark from "../../public/Check_round_fill.svg";
import EndScreen from "../endScreen/endScreen";

type Props = {
  selectedDifficulty: string;
  onTryAgain: () => void;
};

// Function to randomly select and shuffle questions
function getRandomQuestions<T>(questions: T[], count: number): T[] {
  return [...questions].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function QuizGame({ selectedDifficulty, onTryAgain }: Props) {
  // Filter questions based on selected difficulty level and get random questions ONCE
  const [Quiz] = useState(() => {
    const FilteredQuestion = bibleQuiz.filter(
      (quiz) => quiz.level === selectedDifficulty
    );
    return getRandomQuestions(FilteredQuestion, 10);
  });

  // Current question index (starts at 0)
  const [current, setCurrent] = useState(0);

  // User's score (number of correct answers)
  const [score, setScore] = useState(0);

  // Whether to show final results
  const [showResult, setShowResult] = useState(false);

  // Array to track which questions have been answered
  const [answer, setAnswer] = useState<number[]>([]);

  // Currently selected option for the current question
  const [selected, setSelected] = useState<string | null>(null);

  // Flag to prevent multiple clicks on the same question
  const [isAnswering, setIsAnswering] = useState(false);

  console.log("Quiz questions (fixed):", Quiz);

  // Handle when user clicks on an option
  const handleAnswer = (optionSelected: string) => {
    // Prevent multiple clicks while processing answer
    if (isAnswering) return;

    // Set answering flag to true
    setIsAnswering(true);

    // Get the correct answer for current question
    const correct = Quiz[current].answer;

    // Set the selected option to show visual feedback
    setSelected(optionSelected);

    // Check if answer is correct and update score
    if (optionSelected === correct) {
      setScore((prev) => prev + 1);
    }

    // Add current question index to answered questions array
    if (!answer.includes(current)) {
      setAnswer((prev) => [...prev, current]);
    }

    // Wait 900ms to show the answer feedback, then move to next question
    setTimeout(() => {
      // Check if there are more questions
      if (current < Quiz.length - 1) {
        // Move to next question
        setCurrent((prev) => prev + 1);
        // Reset selected option for next question
        setSelected(null);
        // Reset answering flag
        setIsAnswering(false);
      } else {
        // Show final results if this was the last question
        setShowResult(true);
      }
    }, 900);
  };

  // Function to determine which icon to show for each option
  const getIcon = (option: string) => {
    // Don't show icons if no option is selected yet
    if (selected === null) return null;

    // Show checkmark for correct answer
    if (option === Quiz[current].answer) {
      return <Image src={mark} alt="correct" className="inline-block ml-2" />;
    }

    // Show cross for incorrect selected answer
    if (option === selected && option !== Quiz[current].answer) {
      return (
        <Image src={cross} alt="incorrect" className="inline-block ml-2" />
      );
    }

    // No icon for other options
    return null;
  };

  // Function to determine background style for each option
  const getStyle = (option: string) => {
    // No special styling if no option is selected
    if (!selected) return {};

    // Green background for correct answer
    if (option === Quiz[current].answer) {
      return { backgroundColor: "#22c55e" }; // Green for correct
    }

    // Red background for incorrect selected answer
    if (option === selected && option !== Quiz[current].answer) {
      return { backgroundColor: "#ef4444" }; // Red for incorrect
    }

    // Default styling for other options
    return {};
  };

  return (
    <div className="flex flex-col gap-5 mt-[80px]">
      {/* Quiz header showing score and progress */}
      <QuizHeader score={score} quiz={Quiz} />

      {/* Conditional rendering: show results or current question */}
      {showResult ? (
        <EndScreen score={score} Quiz={Quiz} onTryAgain={onTryAgain} />
      ) : (
        <div className="bg-[#51486877] shadow-2xs py-12 px-2">
          <div className="w-full md:w-[450px] m-auto flex flex-col gap-6">
            {/* Question navigation dots */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {Quiz.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-[50%] w-[35px] h-[35px] text-[14px] flex items-center justify-center text-center cursor-pointer ${
                    i === current
                      ? "bg-gradient text-white" // Current question styling
                      : answer.includes(i)
                      ? "bg-gradient text-white" // Answered question styling
                      : "bg-amber-50" // Unanswered question styling
                  }`}
                  onClick={() => {
                    // Only allow navigation if not currently answering
                    if (!isAnswering) {
                      setCurrent(i);
                      setSelected(null); // Reset selection when navigating
                    }
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Current question and options */}
            {Quiz[current] && (
              <>
                {/* Question text */}
                <h2 className="text-center text-[#f5f5f5] text-lg font-semibold">
                  Question {current + 1}: {Quiz[current].question}
                </h2>

                {/* Answer options in a 2x2 grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 w-full">
                  {Quiz[current].options.map((option, id) => (
                    <button
                      key={id}
                      onClick={() => handleAnswer(option)}
                      disabled={isAnswering} // Disable button while processing answer
                      style={getStyle(option)} // Apply dynamic styling
                      className={`bg-[#f5f5f52a] py-4 rounded hover:bg-[#f5f5f550] transition-colors text-[#f5f5f5] font-normal flex items-center justify-center ${
                        isAnswering
                          ? "cursor-not-allowed opacity-75"
                          : "cursor-pointer"
                      }`}
                    >
                      {option}
                      {getIcon(option)} {/* Show checkmark or cross icon */}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
