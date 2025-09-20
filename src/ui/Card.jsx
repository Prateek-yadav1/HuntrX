import React from "react";

const Card = ({ title, Content = [] }) => {
  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col h-[300px] border border-gray-100">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
        {Content.map((project, id) => (
          <div
            key={id}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer group transition hover:bg-blue-50"
          >
            {/* Indicator bar */}
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>

            {/* Text */}
            <span className="text-sm text-gray-700 font-medium group-hover:text-blue-700">
              {project.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
