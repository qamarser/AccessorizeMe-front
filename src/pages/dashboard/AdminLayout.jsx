import React, { useState } from "react";
import Sidebar_admin from "../../components/Sidebar_admin";

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("");

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
      <main className={`flex-grow p-6 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"}`}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
