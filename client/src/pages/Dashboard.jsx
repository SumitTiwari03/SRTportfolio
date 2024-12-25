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
          backgroundColor: activeTab === "profile" ? "#f3f4f6":"white",
        }}>
          Profile
        </button>

        <button onClick={() => { handleTabClick("project") }} id='tabsBtn' style={{
          color: activeTab === "project" ? "red" : "black",
          backgroundColor: activeTab === "project" ? "#f3f4f6":"white",
        }}>
          Project
        </button>
      </div>
      <div className="w-full min-h-screen bg-gray-100" style={{
        display:activeTab==="project"?'block':'none'
      }}>
      <DashboardProject/>
      </div>
      <div className="w-full min-h-screen bg-gray-100" style={{
        display:activeTab==="profile"?'block':'none'
        
      }}>
        <DashboardProfile/>
      </div>

    </>
  )
  // return (
  //   <div
  //     style={{
  //       width: "80%",
  //       margin: "50px auto",
  //       border: "1px solid #ddd",
  //       borderRadius: "5px",
  //       overflow: "hidden",
  //     }}
  //   >
  //     {/* Tab Buttons */}
  //     <div
  //       style={{
  //         display: "flex",
  //         borderBottom: "1px solid #ddd",
  //         backgroundColor: "#f5f5f5",
  //       }}
  //     >
  //       <button
  //         style={{
  //           flex: 1,
  //           padding: "10px",
  //           border: "none",
  //           borderTopLeftRadius: "5px",
  //           borderTopRightRadius: "5px",
  //           backgroundColor: activeTab === "tab1" ? "white" : "#f5f5f5",
  //           borderBottom: activeTab === "tab1" ? "none" : "1px solid #ddd",
  //           cursor: "pointer",
  //           fontWeight: activeTab === "tab1" ? "bold" : "normal",
  //         }}
  //         onClick={() => handleTabClick("tab1")}
  //       >
  //         Tab 1
  //       </button>
  //       <button
  //         style={{
  //           flex: 1,
  //           padding: "10px",
  //           border: "none",
  //           borderTopLeftRadius: "5px",
  //           borderTopRightRadius: "5px",
  //           backgroundColor: activeTab === "tab2" ? "white" : "#f5f5f5",
  //           borderBottom: activeTab === "tab2" ? "none" : "1px solid #ddd",
  //           cursor: "pointer",
  //           fontWeight: activeTab === "tab2" ? "bold" : "normal",
  //         }}
  //         onClick={() => handleTabClick("tab2")}
  //       >
  //         Tab 2
  //       </button>
  //       <button
  //         style={{
  //           flex: 1,
  //           padding: "10px",
  //           border: "none",
  //           borderTopLeftRadius: "5px",
  //           borderTopRightRadius: "5px",
  //           backgroundColor: activeTab === "tab3" ? "white" : "#f5f5f5",
  //           borderBottom: activeTab === "tab3" ? "none" : "1px solid #ddd",
  //           cursor: "pointer",
  //           fontWeight: activeTab === "tab3" ? "bold" : "normal",
  //         }}
  //         onClick={() => handleTabClick("tab3")}
  //       >
  //         Tab 3
  //       </button>
  //     </div>

  //     {/* Tab Content */}
  //     <div style={{ padding: "20px", backgroundColor: "white" }}>
  //       {activeTab === "tab1" && <div>This is the content of Tab 1.</div>}
  //       {activeTab === "tab2" && <div>This is the content of Tab 2.</div>}
  //       {activeTab === "tab3" && <div>This is the content of Tab 3.</div>}
  //     </div>
  //   </div>
  // );
}

export default Dashboard;
