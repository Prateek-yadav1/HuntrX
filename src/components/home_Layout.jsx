import React, { useEffect, useState } from 'react';
import Feed from './Feed';
import Card from '../ui/Card';

const PROJECT_API_URL = "http://localhost:5050/api/projects";

import ProfileCard from './profileCard'
const Home_Layout = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(PROJECT_API_URL)
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto scroll-smooth">
      <div className="grid gap-5 grid-cols-[250px_1fr_250px]">
        <div className="sticky top-0 self-start"><ProfileCard /></div>
        <div className="min-w-90"><Feed /></div>
        <div className="h-fit space-y-4 sticky top-0 self-start">
          <Card title="Live Projects" Content={projects} />

            <Card title="EWYL" Content={projects} />
          
        </div>
      </div>
    </div>
  );
};

export default Home_Layout;
