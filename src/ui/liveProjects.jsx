// LiveProjectsList.js
import React from "react";
import CardLP from "./CardLP";

const projects = [
  {
    id: 1,
    title: "AI Chatbot for Healthcare",
    mentorName: "Dr. Rohan Mehta",
    mentorImage: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    title: "Blockchain Voting System",
    mentorName: "Prof. Neha Kapoor",
    mentorImage: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function LiveProjectsList() {
  return (
    <div className="p-6 flex justify-center">
      <CardLP projects={projects} />
    </div>
  );
}
