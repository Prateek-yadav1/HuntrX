import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

// Mock Data for Opportunities
const mockOpportunities = [
  {
    _id: "1",
    title: "Frontend Developer Intern",
    company: "TechNova Pvt. Ltd.",
    duration: "3 months",
    lastApply: "2025-10-12",
    stipend: "₹12,000/month",
    description:
      "Work with our frontend team to build responsive, user-friendly web applications.",
    skills: ["React", "Tailwind CSS", "JavaScript"],
  },
  {
    _id: "2",
    title: "Data Analyst Intern",
    company: "DataVision Analytics",
    duration: "4 months",
    lastApply: "2025-10-25",
    stipend: "₹15,000/month",
    description:
      "Assist in analyzing datasets, preparing reports, and deriving business insights.",
    skills: ["Python", "SQL", "Excel"],
  },
  {
    _id: "3",
    title: "Mobile App Developer Intern",
    company: "AppWorks Solutions",
    duration: "6 months",
    lastApply: "2025-11-05",
    stipend: "₹18,000/month",
    description:
      "Develop and test cross-platform mobile apps for clients across industries.",
    skills: ["Flutter", "Dart", "Firebase"],
  },
  {
    _id: "4",
    title: "Cybersecurity Intern",
    company: "SecureNet Technologies",
    duration: "5 months",
    lastApply: "2025-10-28",
    stipend: "₹14,000/month",
    description:
      "Contribute to security audits, threat detection, and ethical hacking simulations.",
    skills: ["Linux", "Networking", "Ethical Hacking"],
  },
  {
    _id: "5",
    title: "Cloud Engineer Intern",
    company: "CloudSphere Ltd.",
    duration: "6 months",
    lastApply: "2025-11-15",
    stipend: "₹20,000/month",
    description:
      "Gain hands-on experience with cloud infrastructure, deployment, and automation.",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
];

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setOpportunities(mockOpportunities);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold mb-10 text-center text-slate-700">
        💼 Internship Opportunities
      </h1>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opp) => (
          <div
            key={opp._id}
            className="bg-white shadow-lg hover:shadow-2xl transition rounded-2xl p-6 flex flex-col relative border border-gray-100"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {opp.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Company:</span> {opp.company}
              </p>
            </div>

            <div className="text-sm text-gray-600 space-y-1 flex-1">
              <p>
                <span className="font-medium">Duration:</span> {opp.duration}
              </p>
              <p>
                <span className="font-medium">Last Apply:</span> {opp.lastApply}
              </p>
              <p>
                <span className="font-medium">Stipend:</span> {opp.stipend}
              </p>
            </div>

            <button
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:scale-105 transition"
              onClick={() => setSelected(opp)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl max-w-lg w-full p-8 relative border border-white/40">
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
                <span className="font-medium">🏢 Company:</span>{" "}
                {selected.company}
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
                    className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition">
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
