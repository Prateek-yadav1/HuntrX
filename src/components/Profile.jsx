import React from "react";
import { useUser } from "@clerk/clerk-react";

export default function Profile() {
  const { user } = useUser();

  const skills = ["React.js", "Tailwind CSS", "Node.js", "Python"];
  const experiences = [
    {
      role: "Frontend Intern",
      company: "ABC Company",
      duration: "June 2024 - Aug 2024",
      description: "Worked on front-end React development and UI design.",
    },
    {
      role: "Full Stack Intern",
      company: "XYZ Solutions",
      duration: "Jan 2024 - May 2024",
      description: "Developed REST APIs and integrated with React frontend.",
    },
  ];

  return (
    <div className="flex justify-center w-full">
    <div className="min-h-screen w-3xl flex flex-col items-center">
      <div className="max-w-6xl w-full mx-2 overflow-hidden rounded-lg">
        {/* Banner Section */}
        <div className="relative bg-white rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&q=60"
            alt="Banner"
            className="w-full h-48"
          />

          {/* Profile Image Overlapping Banner */}
          <div className="absolute -bottom-12 left-8">
            <img
              src={user?.imageUrl}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Name Section */}
        <div className="bg-white shadow-md rounded-b-lg pt-16 pb-6 px-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.fullName || "Your Name"}
          </h1>
          <p className="text-gray-600">@{user?.username || "username"}</p>
        </div>

        {/* Content Section */}
        <div className="mt-6 space-y-6">
          {/* Education */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Education</h2>
            <p className="text-gray-700">
              B.Tech in Computer Science — BML Munjal University (2023–2027)
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-6">Experience</h2>
            <div className="relative border-l-2 border-blue-200 pl-6">
              {experiences.map((exp, index) => (
                <div key={index} className="mb-8 relative">
                  <span className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-blue-500"></span>
                  <h3 className="text-lg font-semibold text-gray-800">{exp.role}</h3>
                  <p className="text-gray-600 text-sm">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-1">{exp.duration}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Live Projects */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Live Projects
            </h2>
            <div className="space-y-2">
              <div>
                <p className="font-medium text-gray-800">
                  Blockchain Voting System — Mentored by Prof. Neha Kapoor
                </p>
                <p className="text-gray-600 text-sm">
                  A web app for real-time voting system.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  AI Chatbot for Healthcare — Mentored by Dr. Rohan Mehta
                </p>
                <p className="text-gray-600 text-sm">
                  AI-powered healthcare monitoring system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
