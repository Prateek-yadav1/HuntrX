import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OpportunityDetails() {
  const { state: opp } = useLocation();
  const navigate = useNavigate();

  if (!opp) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-700 text-lg">No opportunity selected.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{opp.title}</h1>
        <p className="text-blue-700 text-lg mb-4">{opp.company}</p>

        <div className="space-y-2 mb-6">
          <p className="text-blue-600">
            <span className="font-semibold">Department:</span> {opp.department}
          </p>
          <p className="text-blue-600">
            <span className="font-semibold">Stipend:</span> {opp.stipend}
          </p>
          <p className="text-blue-600">
            <span className="font-semibold">Duration:</span> {opp.duration}
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <h2 className="text-xl font-bold text-blue-800">Description</h2>
          <p className="text-blue-700">{opp.description}</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-blue-800">Requirements</h2>
          <p className="text-blue-700">{opp.requirements}</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Back
        </button>
      </div>
    </div>
  );
}
