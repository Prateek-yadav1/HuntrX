import React from "react";
import { useNavigate } from "react-router-dom";

const opportunities = [
  {
    id: 1,
    title: "AI RESEARCH INTERN",
    company: "TechCorp Labs",
    department: "Artificial Intelligence",
    stipend: "₹15,000/month",
    description: "Work on cutting-edge AI models for text and vision.",
    requirements: "Strong Python skills, basic ML knowledge",
    duration: "3 months",
  },
  {
    id: 2,
    title: "WEB DEVELOPMENT INTERN",
    company: "InnovateX",
    department: "Software Development",
    stipend: "₹10,000/month",
    description: "Develop full-stack web applications with React and Node.",
    requirements: "HTML, CSS, JS, React basics",
    duration: "2 months",
  },
];

export default function Opportunity() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
        Opportunities
      </h1>
      <div className="space-y-4 max-w-4xl mx-auto">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center border border-blue-100 hover:shadow-lg transition"
          >
            <div>
              <h2 className="text-xl font-bold text-blue-500">{opp.title}</h2>
              <p className="text-blue-500">{opp.company}</p>
              <p className="text-blue-500">{opp.department}</p>
              <p className="text-blue-500 font-medium">{opp.stipend}</p>
            </div>
            <button
              onClick={() => navigate(`/opportunity/${opp.id}`, { state: opp })}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800"
            >
              More Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
