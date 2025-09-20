// CardLP.js
import React from "react";
import { CircleDot } from "lucide-react"; // live icon

const CardLP = ({ projects = [] }) => {
  return (
    <div className="w-63 max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col hover:shadow-lg transition">
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Live Projects</h2>
      </div>

      {/* Projects List */}
      <div className="flex flex-col divide-y divide-gray-200">
        {projects.map((project) => (
          <div
            key={project.id}
            className="py-3 flex flex-col gap-2"
          >
            {/* Project Title */}
            <span className="text-gray-800 font-medium text-base mb-1">{project.title}</span>
            
            {/* Mentor Info */}
            <div className="flex items-center gap-3 mb-1">
              <img
                src={project.mentorImage || "/default-avatar.png"}
                alt={project.mentorName}
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
              />
              <span className="text-sm text-gray-500">Mentor: {project.mentorName}</span>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-1 text-red-600 mt-1">
              <CircleDot className="w-3 h-3 animate-pulse" />
              <span className="text-xs font-medium">Live</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardLP;
