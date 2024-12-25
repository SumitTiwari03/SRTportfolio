import React, { useState } from "react";
import './dashboard.css'
import { DashboardProfile, DashboardProject } from "../component";
function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">

        <button onClick={() => { handleTabClick("profile") }} id='tabsBtn' style={{
          color: activeTab === "profile" ? "red" : "black",
          backgroundColor: activeTab === "profile" ? "#f3f4f6" : "white",
        }}>
          Profile
        </button>

        <button onClick={() => { handleTabClick("project") }} id='tabsBtn' style={{
          color: activeTab === "project" ? "red" : "black",
          backgroundColor: activeTab === "project" ? "#f3f4f6" : "white",
        }}>
          Project
        </button>
      </div>
      <div className="w-full min-h-screen bg-gray-100" style={{
        display: activeTab === "project" ? 'block' : 'none'
      }}>
        <DashboardProject />
      </div>
      <div className="w-full min-h-screen bg-gray-100" style={{
        display: activeTab === "profile" ? 'block' : 'none'

      }}>
        <DashboardProfile />
      </div>

    </>
  )
}

export default Dashboard;
