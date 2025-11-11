import React, { useEffect, useState } from "react";
import SkillCard from "../../components/SkillCard"; // adjust path if needed

const AllSkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch skills from your API or JSON
    fetch("/skills.json") // Example: replace with your real API endpoint
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Skills</h2>

      {skills.length === 0 ? (
        <p className="text-gray-500">Loading skills...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.skillId} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSkills;
