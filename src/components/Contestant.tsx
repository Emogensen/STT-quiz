import React, { useState } from "react";

interface ContestantProps {
  contestants: string[];
  onAddContestant: (name: string) => void;
}

const Contestant: React.FC<ContestantProps> = ({
  contestants,
  onAddContestant,
}) => {
  const [contestantName, setContestantName] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContestantName(e.target.value);
  };

  const handleAddContestant = () => {
    if (contestantName.trim() !== "") {
      onAddContestant(contestantName);
      setContestantName("");
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-700 text-2xl font-bold mb-2">
        Contestants
      </label>
      {contestants.map((contestant, index) => (
        <div key={index} className="mb-2 text-xl">
          {contestant}
        </div>
      ))}
      <div className="flex">
        <input
          className="border rounded-l w-full py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={contestantName}
          onChange={handleNameChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleAddContestant}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Contestant;
