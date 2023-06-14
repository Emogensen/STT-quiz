import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Question, QuizData } from "./Quiz";
import { Team } from "./Setup";
import { Card } from "antd";

type QuizPageParams = {
  categoryId: string;
};

interface QuizPageProps {
  quiz: QuizData;
  setQuiz: React.Dispatch<React.SetStateAction<QuizData | undefined>>;
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}

const defaultQuestion: Question = {
  question: "",
  answers: [],
  correctAnswer: "",
};

const QuizPage: React.FC<QuizPageProps> = ({
  quiz,
  setQuiz,
  teams,
  setTeams,
}) => {
  const { categoryId } = useParams<QuizPageParams>();
  const categoryIndex = parseInt(categoryId!, 10);
  const category = quiz.categories[categoryIndex];
  const [questions, setQuestions] = useState<Question[]>(category.questions);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(defaultQuestion);
  const [pointsGiven, setPointsGiven] = useState<boolean>(false);
  const [pointsDeducted, setPointsDeducted] = useState<boolean>(false);
  const [winningTeam, setWinningTeam] = useState<string>("");
  const [losingTeam, setLosingTeam] = useState<string>("");

  useEffect(() => {
    console.log(teams);
    if (currentQuestion.question === "" && category.questions.length > 0) {
      setCurrentQuestion(
        questions[Math.floor(Math.random() * questions.length)]
      );
    } else {
      setCurrentQuestion({
        question: "No more questions in this category",
        answers: [],
        correctAnswer: "",
      });
    }
  }, []);

  const handleRemoveQuestion = (questionToRemove: Question) => {
    const updatedQuiz = { ...quiz };

    updatedQuiz.categories.forEach((category) => {
      category.questions = category.questions.filter(
        (question) =>
          JSON.stringify(question) !== JSON.stringify(questionToRemove)
      );
    });

    setQuiz(updatedQuiz);
  };

  const handleAnswerSelect = (answer: string) => {
    setShowResult(false);
    setSelectedAnswer(answer);
    setPointsDeducted(false);
  };

  const submitAnswer = () => {
    setShowResult(true);
  };

  const handleAwardPoints = (index: number) => {
    const updatedTeams = [...teams];
    updatedTeams[index].score = updatedTeams[index].score + 3;
    setTeams(updatedTeams);
    setWinningTeam(updatedTeams[index].name);
    setPointsGiven(true);
    handleRemoveQuestion(currentQuestion);
  };

  const handleDeductPoints = (index: number) => {
    const updatedTeams = [...teams];
    updatedTeams[index].score = updatedTeams[index].score - 1;
    setTeams(updatedTeams);
    setLosingTeam(updatedTeams[index].name);
    setPointsDeducted(true);
  };

  //   const currentQuestion = questions[getRandomNumber(questions.length)];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center max-w-md mx-auto">
        {currentQuestion.question === "No more questions in this category" ? (
          <h2 className="text-2xl font-bold mb-4">
            {currentQuestion.question} :(
          </h2>
        ) : (
          <>
            <div className="w-full flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">
                {category.name} question
              </h2>
              <Card
                title={currentQuestion.question}
                bordered={false}
                className="w-fit mt-4"
              >
                <ul>
                  {currentQuestion.answers.map((answer, answerIndex) => (
                    <li key={answerIndex}>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="answer"
                          value={answer}
                          checked={selectedAnswer === answer}
                          disabled={winningTeam !== ""}
                          onChange={() => handleAnswerSelect(answer)}
                          className="mr-2"
                        />
                        {answer}
                      </label>
                    </li>
                  ))}
                </ul>
              </Card>
              <div className="flex justify-center mt-4">
                {!showResult && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={submitAnswer}
                    disabled={!selectedAnswer || winningTeam !== ""}
                  >
                    Submit answer
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {showResult && (
        <div className="max-w-md mx-auto mt-4">
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl font-bold mb-4">Correct!</p>
              <p className="text-lg mb-4">3 points to:</p>
              <div className="flex flex-row items-center justify-between mb-2">
                {teams.map((team, index) => (
                  <button
                    key={index}
                    className="bg-green-500 hover:bg-green-700 text-white mx-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleAwardPoints(index)}
                    disabled={pointsGiven}
                  >
                    {team.name}
                  </button>
                ))}
              </div>
              {pointsGiven && (
                <>
                  <p className="text-lg mb-4">
                    3 points added to {winningTeam}
                  </p>
                  <Link
                    to="/quiz"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Back to categories
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl font-bold mb-4">Incorrect!</p>
              <p className="text-lg mb-4">-1 point to:</p>
              <div className="flex flex-row items-center justify-between mb-2">
                {teams.map((team, index) => (
                  <button
                    key={index}
                    className="bg-red-500 hover:bg-red-700 text-white mx-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDeductPoints(index)}
                  >
                    {team.name}
                  </button>
                ))}
              </div>
              {pointsDeducted && (
                <p className="text-lg mb-4">
                  1 point deducted from {losingTeam}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
