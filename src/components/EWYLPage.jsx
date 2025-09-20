import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const mockProjects = [
  {
    _id: "1",
    title: "AI Research Assistant",
    mentor: "Dr. Jane Doe",
    duration: "6 months",
    lastApply: "2025-10-15",
    stipend: "₹10,000/month",
    description: "Work on cutting-edge AI research with a top mentor.",
    skills: ["Python", "Machine Learning", "Data Analysis"],
  },
  {
    _id: "2",
    title: "Frontend Developer Intern",
    mentor: "Mr. John Smith",
    duration: "3 months",
    lastApply: "2025-09-30",
    stipend: "₹8,000/month",
    description: "Build modern web interfaces for real-world projects.",
    skills: ["React", "CSS", "JavaScript"],
  },
  {
    _id: "3",
    title: "Backend Developer Intern",
    mentor: "Ms. Priya Verma",
    duration: "4 months",
    lastApply: "2025-11-05",
    stipend: "₹9,000/month",
    description: "Work on scalable backend systems and APIs.",
    skills: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    _id: "4",
    title: "Data Science Intern",
    mentor: "Dr. Rahul Mehta",
    duration: "6 months",
    lastApply: "2025-10-25",
    stipend: "₹12,000/month",
    description: "Apply data science techniques to real-world datasets.",
    skills: ["Python", "Pandas", "TensorFlow"],
  },
  {
    _id: "5",
    title: "Cybersecurity Analyst Intern",
    mentor: "Mr. Arjun Kapoor",
    duration: "5 months",
    lastApply: "2025-11-10",
    stipend: "₹11,000/month",
    description: "Analyze threats and strengthen security systems.",
    skills: ["Ethical Hacking", "Networking", "Linux"],
  },
  {
    _id: "6",
    title: "Mobile App Developer Intern",
    mentor: "Ms. Sneha Sharma",
    duration: "3 months",
    lastApply: "2025-09-28",
    stipend: "₹10,000/month",
    description: "Develop cross-platform apps using modern frameworks.",
    skills: ["Flutter", "Dart", "Firebase"],
  },
  {
    _id: "7",
    title: "Cloud Computing Intern",
    mentor: "Mr. Ankit Agarwal",
    duration: "6 months",
    lastApply: "2025-10-18",
    stipend: "₹15,000/month",
    description: "Work with cloud platforms and deployment pipelines.",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
  {
    _id: "8",
    title: "Blockchain Developer Intern",
    mentor: "Dr. Kavita Iyer",
    duration: "4 months",
    lastApply: "2025-10-30",
    stipend: "₹14,000/month",
    description: "Build decentralized applications and smart contracts.",
    skills: ["Solidity", "Ethereum", "Web3.js"],
  },
  {
    _id: "9",
    title: "UI/UX Designer Intern",
    mentor: "Mr. Rohan Gupta",
    duration: "3 months",
    lastApply: "2025-09-29",
    stipend: "₹7,000/month",
    description: "Design user-friendly and engaging digital experiences.",
    skills: ["Figma", "Wireframing", "Prototyping"],
  },
  {
    _id: "10",
    title: "DevOps Engineer Intern",
    mentor: "Ms. Alisha Nair",
    duration: "6 months",
    lastApply: "2025-11-12",
    stipend: "₹13,000/month",
    description: "Automate workflows and manage CI/CD pipelines.",
    skills: ["Jenkins", "Ansible", "GitHub Actions"],
  }


];

export default function EWYLPage() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setProjects(mockProjects);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
     <h1 className="text-3xl font-extrabold mb-10 text-center text-slate-700">
  🚀 EWYL Project Opportunities
</h1>



      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow-lg hover:shadow-2xl transition rounded-2xl p-6 flex flex-col relative border border-gray-100"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {project.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Mentor:</span> {project.mentor}
              </p>
            </div>

            <div className="text-sm text-gray-600 space-y-1 flex-1">
              <p>
                <span className="font-medium">Duration:</span> {project.duration}
              </p>
              <p>
                <span className="font-medium">Last Apply:</span>{" "}
                {project.lastApply}
              </p>
              <p>
                <span className="font-medium">Stipend:</span> {project.stipend}
              </p>
            </div>

            <button
              className="mt-6 w-full bg-blue-600  text-white py-2 rounded-xl font-medium hover:scale-105 transition"
              onClick={() => setSelected(project)}
            >
              More Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl max-w-lg w-full p-8 relative border border-white/40">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setSelected(null)}
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {selected.title}
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">👩‍🏫 Mentor:</span>{" "}
                {selected.mentor}
              </p>
              <p>
                <span className="font-medium">⏳ Duration:</span>{" "}
                {selected.duration}
              </p>
              <p>
                <span className="font-medium">📅 Last Apply:</span>{" "}
                {selected.lastApply}
              </p>
              <p>
                <span className="font-medium">💰 Stipend:</span>{" "}
                {selected.stipend}
              </p>
              <p>
                <span className="font-medium">📝 Description:</span>{" "}
                {selected.description}
              </p>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <span className="font-medium text-gray-700">Required Skills:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {selected.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-blue-800 rounded-full shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button className="mt-6 w-full bg-green-500  text-white py-3 rounded-xl font-semibold hover:scale-105 transition">
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
