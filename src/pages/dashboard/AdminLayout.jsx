import React, { useState } from "react";
import Sidebar_admin from "../../components/Sidebar_admin";
import '../../styling/AdminLayout.css';

const AdminLayout = ({ children }) => {
  // Forcibly set sidebarCollapsed to false to test expanded sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  // console.log("sidebarCollapsed state:", sidebarCollapsed);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar_admin
        sidebarCollapsed={sidebarCollapsed}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        darkMode={false}
        toggleSidebar={toggleSidebar}
      />
      <main className={`admin-layout-main ${sidebarCollapsed ? "collapsed" : "expanded"}`}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
