import { Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Quiz, { QuizData } from './components/Quiz';
import Scoreboard from './components/Scoreboard';
import Setup, { Team } from './components/Setup';
import { useEffect, useState } from 'react';
import QuizPage from './components/QuizPage';
import quizData from './questions/quizData.json';

export default function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [quiz, setQuiz] = useState<QuizData>();

  // Load teams from localStorage on component mount
  useEffect(() => {
    setQuiz(quizData);
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }
  }, []);

  // Save teams to localStorage whenever teams change
  useEffect(() => {
    if (teams.length) {
      localStorage.setItem('teams', JSON.stringify(teams));
    }
  }, [teams]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='quiz' element={<Quiz />} />
          <Route
            path='/quiz/:categoryId'
            element={
              <QuizPage
                quiz={quiz!}
                setQuiz={setQuiz}
                teams={teams}
                setTeams={setTeams}
              />
            }
          />
          <Route
            path='scoreboard'
            element={<Scoreboard teams={teams} setTeams={setTeams} />}
          />
          <Route
            path='setup'
            element={<Setup teams={teams} setTeams={setTeams} />}
          />

          {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}
