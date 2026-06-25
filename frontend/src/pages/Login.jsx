import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { nodeApi } from "../api/axios";
import toast from "react-hot-toast";
import AuthLayout from "../layouts/AuthLayout";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await nodeApi.post("/api/auth/login", { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your Equilibrium account to continue"
    >
      <form onSubmit={handleLogin} className="space-y-6">
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary block">Work Email</label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none group-focus-within:text-primary transition-colors">
              <Mail size={18} />
            </span>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container h-12 pl-12 pr-4 rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary block">Password</label>
            <Link to="#" className="text-xs text-primary hover:underline font-bold">Forgot password?</Link>
          </div>
          <div className="relative group">
            <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none group-focus-within:text-primary transition-colors">
              <Lock size={18} />
            </span>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container h-12 pl-12 pr-4 rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 py-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
          <span className="text-sm font-medium text-on-surface-variant">Remember me for 30 days</span>
        </div>

        <button 
          type="submit" 
          className="w-full bg-primary text-on-primary h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_6px_20px_rgba(var(--primary-rgb),0.4)]"
        >
          Sign In
          <ArrowRight size={18} />
        </button>

      </form>

      <p className="mt-8 text-center text-sm text-on-surface-variant">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary font-bold hover:underline">
          Request Access
        </Link>
      </p>
    </AuthLayout>
  );
}
