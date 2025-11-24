import React, { useState, useMemo } from "react";
import bgImage from "../assets/bg.jpg";

const quizData = [
  {
    topicId: "react",
    topic: "React Basics",
    questions: [
      {
        id: 1,
        text: "What is ReactJS primarily used for?",
        options: [
          "Server-side programming",
          "Building user interfaces",
          "Database management",
          "Data analysis",
        ],
        answer: "Building user interfaces",
      },
      {
        id: 2,
        text: "What hook is used for state management in a functional component?",
        options: ["useState()", "useEffect()", "useContext()", "useReducer()"],
        answer: "useState()",
      },
    ],
  },
  {
    topicId: "tailwind",
    topic: "Tailwind CSS",
    questions: [
      {
        id: 3,
        text: "Tailwind CSS is a type of what framework?",
        options: [
          "Component-based",
          "Utility-first",
          "Semantic",
          "Object-Oriented",
        ],
        answer: "Utility-first",
      },
      {
        id: 4,
        text: "Which class is used to set a flex container?",
        options: ["display-flex", "flexbox", "flex-container", "flex"],
        answer: "flex",
      },
      {
        id: 5,
        text: "How do you make an element invisible in Tailwind?",
        options: ["hide", "hidden", "invisible", "display-none"],
        answer: "hidden",
      },
    ],
  },
  {
    topicId: "es6",
    topic: "JavaScript ES6",
    questions: [
      {
        id: 6,
        text: "Which keyword is used for block-scoped variables?",
        options: ["var", "let", "const", "local"],
        answer: "let",
      },
      {
        id: 7,
        text: "What does the '...' spread operator do?",
        options: [
          "Concatenates strings",
          "Copies array or object values",
          "Performs multiplication",
          "Defines a rest parameter only",
        ],
        answer: "Copies array or object values",
      },
    ],
  },
];

const allQuestions = quizData.reduce((acc, topic) => {
  const mapped = topic.questions.map((q) => ({
    ...q,
    topicId: topic.topicId,
    topicName: topic.topic,
  }));
  return acc.concat(mapped);
}, []);

const TopicItem = ({ name, correct, incorrect, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-2 sm:p-3 rounded-lg flex justify-between items-center transition duration-300 transform
      ${
        isActive
          ? "bg-indigo-600 border-2 border-green-400 shadow-lg shadow-green-500/30"
          : "hover:bg-indigo-700 hover:border-indigo-500 border-2 border-transparent"
      }`}
  >
    <span className="text-sm sm:text-base text-white font-medium text-left">
      {name}
    </span>
    <div className="flex space-x-2 flex-shrink-0">
      <div className="bg-green-500 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
        <span className="text-xs sm:text-sm text-white font-bold">
          {"✓"}
          {correct}
        </span>
      </div>
      <div className="bg-red-500 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
        <span className="text-xs sm:text-sm text-white font-bold">
          {"✕"}
          {incorrect}
        </span>
      </div>
    </div>
  </button>
);

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const totalQuestions = allQuestions.length;
  const currentQuestion =
    allQuestions[Math.min(currentQuestionIndex, totalQuestions - 1)];
  const currentQuestionNumber = currentQuestionIndex + 1;
  const selectedOption = userAnswers[currentQuestion.id] || null;

  const topicScores = useMemo(() => {
    const scores = quizData.reduce(
      (acc, topic) => ({
        ...acc,
        [topic.topicId]: { correct: 0, incorrect: 0 },
      }),
      {}
    );

    Object.keys(userAnswers).forEach((qId) => {
      const q = allQuestions.find((q) => q.id === parseInt(qId, 10));
      if (!q) return;

      const answer = userAnswers[qId];
      if (answer === q.answer) {
        scores[q.topicId].correct += 1;
      } else {
        scores[q.topicId].incorrect += 1;
      }
    });

    return quizData.map((topic) => ({
      ...topic,
      correct: scores[topic.topicId].correct,
      incorrect: scores[topic.topicId].incorrect,
    }));
  }, [userAnswers]);

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleOptionSelect = (option) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: option,
    }));
  };

  const handleTopicClick = (topicId) => {
    const firstQuestionIndex = allQuestions.findIndex(
      (q) => q.topicId === topicId
    );
    if (firstQuestionIndex !== -1) {
      setCurrentQuestionIndex(firstQuestionIndex);
    }
  };

  const activeTopicName = currentQuestion.topicName;

  const getOptionStyle = (option) => {
    if (selectedOption === option) {
      const isCorrect = option === currentQuestion.answer;
      return isCorrect
        ? "bg-green-600 border-2 border-green-400 shadow-lg shadow-green-500/50"
        : "bg-red-600 border-2 border-red-400 shadow-lg shadow-red-500/50";
    } else if (selectedOption !== null && option === currentQuestion.answer) {
      return "bg-green-700 opacity-80";
    }
    return "bg-purple-700 hover:bg-purple-600 hover:shadow-xl hover:shadow-indigo-500/20";
  };

  const isAnswered = selectedOption !== null;

  return (
    <div
      className="h-screen w-screen bg-black bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative h-full w-full p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full h-full">
          <div className="w-full sm:w-1/3 p-4 bg-purple-900/90 rounded-2xl shadow-2xl border border-purple-700 overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 sm:mb-5 text-center sm:text-left">
              Quiz Topics
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {topicScores.map((topic) => (
                <TopicItem
                  key={topic.topicId}
                  name={topic.topic}
                  correct={topic.correct}
                  incorrect={topic.incorrect}
                  isActive={topic.topic === activeTopicName}
                  onClick={() => handleTopicClick(topic.topicId)}
                />
              ))}
            </div>
          </div>

          <div className="w-full sm:w-2/3 p-4 sm:p-8 bg-purple-800/90 rounded-2xl shadow-2xl border border-purple-700 flex flex-col justify-between max-h-full overflow-y-auto">
            <div>
              <div className="text-center text-lg sm:text-xl font-bold text-green-400 mb-4 sm:mb-6">
                {currentQuestionNumber}/{totalQuestions}
              </div>

              <h3 className="text-lg sm:text-2xl text-white font-semibold mb-6 sm:mb-8 text-center border-b-2 border-purple-500 pb-3 sm:pb-4">
                {currentQuestion.text}
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    disabled={isAnswered}
                    className={`w-full p-3 sm:p-4 rounded-xl text-left text-sm sm:text-base text-white font-medium transition duration-300 transform scale-100 
                      ${isAnswered ? "cursor-default" : "active:scale-[0.99]"} 
                      ${getOptionStyle(option)}
                      focus:outline-none focus:ring-4 focus:ring-yellow-400/50`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <span className="text-sm mr-2 sm:mr-4 font-extrabold text-green-300">
                      {String.fromCharCode(65 + index)}:
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div
                  className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl text-center font-extrabold text-base sm:text-xl 
                  ${
                    selectedOption === currentQuestion.answer
                      ? "bg-green-500 text-black shadow-lg shadow-green-500/40"
                      : "bg-red-500 text-white shadow-lg shadow-red-500/40"
                  }`}
                >
                  {selectedOption === currentQuestion.answer
                    ? "Correct Answer! 🥳"
                    : "Incorrect."}
                </div>
              )}
            </div>

            <div className="mt-6 sm:mt-10 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-lg font-bold transition duration-300 shadow-md
                  ${
                    currentQuestionIndex === 0
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-indigo-500/40"
                  }`}
              >
                {"<<"} Prev
              </button>

              <button
                onClick={handleNext}
                disabled={
                  currentQuestionIndex === totalQuestions - 1 || !isAnswered
                }
                className={`px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-lg font-bold transition duration-300 shadow-md
                  ${
                    currentQuestionIndex === totalQuestions - 1 || !isAnswered
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-400 hover:shadow-green-500/40"
                  }`}
              >
                {currentQuestionIndex === totalQuestions - 1
                  ? "Finish"
                  : "Next >>"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
