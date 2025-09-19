import React, { useState } from "react";
import TopBar from "./components/topBar"
import Sidebar from "./components/Sidebar";
import Home_Layout from "./components/home_Layout";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
       <Home_Layout/>
        </div>
      </div>
    </div>
  );
};

export default App;
