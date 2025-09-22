import React, { useState } from 'react';
import SidebarNavbar from './SidebarNavbar'; // Adjust path if needed
import TopNavbar from './TopNavbar'; // Adjust path if needed

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Function to toggle sidebar open/close
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarNavbar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className={`flex flex-col flex-grow transition-[margin-left] duration-300 ease-in-out ${sidebarOpen ? 'ml-16' : 'ml-0'}`}>
        <TopNavbar onMenuClick={toggleSidebar} />
        <main className="flex-grow overflow-auto p-4 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
