import { Activity } from "lucide-react";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-background text-on-surface flex font-sans">
      
      {/* Left Column: Branding / Graphic */}
      <div className="hidden lg:flex w-1/2 relative bg-surface-container overflow-hidden">
        {/* Subtle animated background gradient */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary via-background to-background"></div>
        
        {/* Glassmorphic overlay grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative z-10 flex flex-col justify-between p-16 h-full w-full">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                <Activity size={24} className="text-on-primary" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tighter text-on-surface">Equilibrium</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Intelligence Platform</p>
              </div>
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-black tracking-tighter text-on-surface mb-4">
              Predictive signals.<br/>
              <span className="text-primary">Definitive action.</span>
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              Access real-time global market intelligence, competitor velocity tracking, and AI-driven emerging trend analysis.
            </p>
            <div className="flex items-center gap-4 text-sm font-bold text-secondary uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-outline-variant"></span>
              Restricted Enterprise Access
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md relative z-10">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tighter mb-2 text-on-surface">{title}</h2>
            <p className="text-on-surface-variant font-medium">{subtitle}</p>
          </div>

          {children}

        </div>
      </div>
      
    </div>
  );
}
