import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Search, Bell, User, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function DashboardLayout({ children, title }) {
  const location = useLocation();
  const isPrintMode = location.search.includes("print=true");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isPrintMode) {
    return (
      <div className="min-h-screen bg-background text-on-surface font-sans">
        <main className="flex flex-col relative min-h-screen">
          <section className="p-8 flex-1">
            {children}
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 md:ml-64 flex flex-col relative min-h-screen w-full max-w-full">
        {/* TOP NAVBAR */}
        <header className="fixed top-0 right-0 left-0 md:left-64 h-16 flex justify-between items-center px-4 md:px-8 z-30 bg-background border-b border-outline-variant">
          <div className="flex items-center gap-3 md:gap-8 overflow-hidden">
            <button 
              className="md:hidden flex-shrink-0 p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <span className="font-headline text-lg font-black tracking-tight text-on-surface truncate">{title}</span>
            
            <div className="relative group hidden sm:block">
              <span className="absolute inset-y-0 left-3 flex items-center text-outline pointer-events-none group-focus-within:text-primary transition-colors">
                <Search size={16} />
              </span>
              <input 
                className="bg-surface-container h-10 pl-10 pr-4 rounded-lg border border-outline-variant text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-48 md:w-64 transition-all" 
                placeholder="Search across intelligence..." 
                type="text"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Mobile search icon (shows only on very small screens instead of the full input) */}
            <button className="sm:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-on-surface-variant transition-colors">
              <Search size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-on-surface-variant transition-colors">
              <Bell size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-on-surface-variant transition-colors">
              <User size={20} />
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="mt-16 p-4 md:p-8 flex-1 overflow-x-hidden overflow-y-auto min-h-[calc(100vh-64px)]">
          {children}
        </section>
      </main>
    </div>
  );
}
