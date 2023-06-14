import { Team } from "./Setup";

interface ScoreboardProps {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ teams, setTeams }) => {
  const handleReset = () => {
    const updatedTeams = teams.map((team) => {
      return {
        ...team,
        score: 0,
      };
    });

    setTeams(updatedTeams);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-center">
        <h2 className="text-2xl font-bold mb-4">Scoreboard</h2>
      </div>
      {teams.map((team, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <span className="font-bold">{team.name}</span>
          <span className="font-bold">{team.score}</span>
        </div>
      ))}
      {teams.length > 0 && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white mx-1 mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleReset}
        >
          Reset score
        </button>
      )}
    </div>
  );
};

export default Scoreboard;
