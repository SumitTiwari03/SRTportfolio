import React, { useState } from "react";
import './dashboard.css'
import { DashboardProfile, DashboardProject, DashboardSkills, DashboardExperience, DashboardAchievements } from "../component";
import { useNavigate } from "react-router-dom";
import { Mail, FolderKanban, Award, Briefcase, Code, LogOut, Menu, X } from "lucide-react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    navigate('/dashboard_login');
  };

  const tabs = [
    { id: "profile", label: "Email Leads", icon: Mail, color: "from-blue-500 to-cyan-500" },
    { id: "project", label: "Projects", icon: FolderKanban, color: "from-purple-500 to-pink-500" },
    { id: "skills", label: "Skills", icon: Code, color: "from-green-500 to-teal-500" },
    { id: "experience", label: "Experience", icon: Briefcase, color: "from-indigo-500 to-purple-500" },
    { id: "achievements", label: "Achievements", icon: Award, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-700">
          {isSidebarOpen && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                    : "hover:bg-gray-700/50 text-gray-300"
                }`}
              >
                <Icon className={`h-5 w-5 ${!isSidebarOpen && "mx-auto"}`} />
                {isSidebarOpen && <span className="font-medium">{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-3 rounded-xl bg-red-600 hover:bg-red-700 transition-colors"
          >
            <LogOut className={`h-5 w-5 ${!isSidebarOpen && "mx-auto"}`} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {tabs.find((t) => t.id === activeTab)?.label || "Dashboard"}
              </h2>
              <p className="text-gray-600 mt-1">Manage your portfolio content</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back</p>
                <p className="font-semibold text-gray-800">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-0">
          <div style={{ display: activeTab === "profile" ? "block" : "none" }}>
            <DashboardProfile />
          </div>
          <div style={{ display: activeTab === "project" ? "block" : "none" }}>
            <DashboardProject />
          </div>
          <div style={{ display: activeTab === "skills" ? "block" : "none" }}>
            <DashboardSkills />
          </div>
          <div style={{ display: activeTab === "experience" ? "block" : "none" }}>
            <DashboardExperience />
          </div>
          <div style={{ display: activeTab === "achievements" ? "block" : "none" }}>
            <DashboardAchievements />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
