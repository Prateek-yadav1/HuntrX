import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default App;
