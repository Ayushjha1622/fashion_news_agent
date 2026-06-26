import { NavLink, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Rss, Hash, Users, Calendar, Activity, Settings, User, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };
  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Intelligence Feed", path: "/feed", icon: Rss },
    { name: "Topics", path: "/topics", icon: Hash },
    { name: "Competitors", path: "/competitors", icon: Users },
    { name: "Daily Brief", path: "/brief", icon: Calendar },
    { name: "Analytics", path: "/analytics", icon: Activity },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full flex flex-col py-6 px-4 bg-surface-container-low w-64 border-r border-outline-variant z-50 transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      <div className="mb-10 px-2 flex justify-between items-center">
        <div>
          <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">Equilibrium</h1>
          <p className="text-secondary text-[10px] uppercase tracking-widest font-bold mt-1">Intelligence Platform</p>
        </div>
        <button 
          className="md:hidden text-on-surface-variant hover:bg-surface-container-highest p-1 rounded-lg"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 space-y-1 font-body text-sm tracking-normal overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg duration-200 ease-in-out cursor-pointer ${
                isActive
                  ? "text-primary bg-secondary-container"
                  : "text-on-secondary-container hover:bg-surface-container-highest"
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant space-y-1">
        <div className="flex items-center gap-3 px-4 py-3 text-on-secondary-container hover:bg-surface-container-highest transition-colors duration-200 ease-in-out cursor-pointer rounded-lg">
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </div>
        <a 
          href="#"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-on-secondary-container hover:bg-surface-container-highest transition-colors duration-200 ease-in-out cursor-pointer rounded-lg"
        >
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-on-surface line-clamp-1">{user ? user.name : "Guest Analyst"}</span>
            <span className="text-[10px] text-secondary">Sign Out</span>
          </div>
        </a>
      </div>
    </aside>
  );
}
