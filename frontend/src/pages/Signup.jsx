import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { nodeApi } from "../api/axios";
import toast from "react-hot-toast";
import AuthLayout from "../layouts/AuthLayout";
import { Mail, Lock, User, Building, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await nodeApi.post("/api/auth/register", formData);
      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Failed to create account");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Apply for enterprise access to the intelligence platform"
    >
      <form onSubmit={handleSignup} className="space-y-5">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary block">Full Name</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none group-focus-within:text-primary transition-colors">
                <User size={18} />
              </span>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-surface-container h-12 pl-12 pr-4 rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline"
                placeholder="Alex Mercer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary block">Company</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none group-focus-within:text-primary transition-colors">
                <Building size={18} />
              </span>
              <input 
                type="text" 
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-surface-container h-12 pl-12 pr-4 rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline"
                placeholder="OmniCorp Inc."
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary block">Work Email</label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none group-focus-within:text-primary transition-colors">
              <Mail size={18} />
            </span>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-surface-container h-12 pl-12 pr-4 rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary block">Password</label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none group-focus-within:text-primary transition-colors">
              <Lock size={18} />
            </span>
            <input 
              type="password" 
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-surface-container h-12 pl-12 pr-4 rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline"
              placeholder="••••••••"
            />
          </div>
          <p className="text-[10px] text-secondary mt-1">Must be at least 8 characters long and contain a number.</p>
        </div>

        <button 
          type="submit" 
          className="w-full bg-primary text-on-primary h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(var(--primary-rgb),0.3)] mt-4"
        >
          Create Account
          <ArrowRight size={18} />
        </button>

      </form>

      <p className="mt-8 text-center text-sm text-on-surface-variant">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
