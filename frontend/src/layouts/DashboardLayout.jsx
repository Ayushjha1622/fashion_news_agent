import Sidebar from "../components/Sidebar";
import { Search, Bell, User } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function DashboardLayout({ children, title }) {
  const location = useLocation();
  const isPrintMode = location.search.includes("print=true");

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
    <div className="min-h-screen bg-background text-on-surface font-sans">
      <Sidebar />
      
      <main className="ml-64 flex flex-col relative min-h-screen">
        {/* TOP NAVBAR */}
        <header className="fixed top-0 right-0 left-64 h-16 flex justify-between items-center px-8 z-40 bg-background border-b border-outline-variant">
          <div className="flex items-center gap-8">
            <span className="font-headline text-lg font-black tracking-tight text-on-surface">{title}</span>
            
            <div className="relative group">
              <span className="absolute inset-y-0 left-3 flex items-center text-outline pointer-events-none group-focus-within:text-primary transition-colors">
                <Search size={16} />
              </span>
              <input 
                className="bg-surface-container h-10 pl-10 pr-4 rounded-lg border border-outline-variant text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-64 transition-all" 
                placeholder="Search across intelligence..." 
                type="text"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-on-surface-variant transition-colors">
              <Bell size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-on-surface-variant transition-colors">
              <User size={20} />
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="mt-16 p-8 flex-1 overflow-y-auto min-h-[calc(100vh-64px)]">
          {children}
        </section>
      </main>
    </div>
  );
}
