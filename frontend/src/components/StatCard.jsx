import { LucideIcon } from "lucide-react";

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  colorClass, 
  trend 
}) {
  return (
    <div className="bg-zinc-900/50 p-5 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden group">
      
      {/* Subtle top gradient line */}
      <div className={`absolute top-0 left-0 w-full h-[2px] ${colorClass.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />
      
      <div className="flex justify-between items-start text-zinc-400 mb-4 relative z-10">
        <h3 className="font-medium tracking-tight text-sm text-zinc-300">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClass.bg} bg-opacity-10 ${colorClass.text}`}>
          <Icon size={18} />
        </div>
      </div>
      
      <p className="text-3xl font-bold mt-1 text-white tracking-tight relative z-10">
        {value}
      </p>
      
      <div className="flex items-center gap-2 mt-3 relative z-10">
        <span className={`text-xs font-semibold ${trend === 'up' || trend === 'neutral' ? 'text-emerald-400' : 'text-rose-400'}`}>
          {subtitle}
        </span>
      </div>
      
      {/* Glow effect on hover */}
      <div className={`absolute -right-8 -bottom-8 w-24 h-24 ${colorClass.bg} rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity`} />
    </div>
  );
}
