import { useState } from "react";
import Contestant from "./Contestant";

export interface Team {
  name: string;
  contestants: string[];
  score: number;
}

interface TeamFormProps {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}

const Setup: React.FC<TeamFormProps> = ({ teams, setTeams }) => {
  const [teamCount, setTeamCount] = useState<number>(1);

  const handleAddTeam = () => {
    setTeams([
      ...teams,
      { name: "Team" + teamCount, contestants: [], score: 0 },
    ]);
    setTeamCount((prevCount) => prevCount + 1);
  };

  const handleRemoveTeam = (index: number) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this team?"
    );
    if (confirmRemove) {
      const updatedTeams = [...teams];
      updatedTeams.splice(index, 1);
      setTeams(updatedTeams);
    }
  };

  const handleTeamNameChange = (index: number, name: string) => {
    const updatedTeams = [...teams];
    updatedTeams[index].name = name;
    setTeams(updatedTeams);
  };

  const handleAddContestant = (index: number, name: string) => {
    const updatedTeams = [...teams];
    updatedTeams[index].contestants.push(name);
    setTeams(updatedTeams);
  };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     console.log(teams);
  //   };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add teams and contestants</h2>
      <form>
        {teams.map((team, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Team name
              </label>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => handleRemoveTeam(index)}
              >
                X
              </button>
            </div>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={team.name}
              onChange={(e) => handleTeamNameChange(index, e.target.value)}
            />
            <Contestant
              contestants={team.contestants}
              onAddContestant={(name) => handleAddContestant(index, name)}
            />
          </div>
        ))}
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddTeam}
          >
            New team
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setup;
