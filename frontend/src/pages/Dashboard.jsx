import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import KPICard from "../components/KPICard";
import GlassCard from "../components/GlassCard";
import { handleApiError } from "../utils/errorHandler";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import { FileText, TrendingUp, AlertCircle, Hash, Users, ArrowUpRight, Activity, ChevronRight, BookmarkPlus, AlertOctagon, AlertTriangle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [latest, setLatest] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {

    Promise.all([
      api.get("/stats").then((res) => setStats(res.data)),
      api.get("/latest").then((res) => setLatest(res.data.articles)),
      api.get("/dashboard-summary").then((res) => setSummary(res.data))
    ])
      .catch(handleApiError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="animate-pulse space-y-6">
          <div className="h-20 bg-surface-container rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="h-32 bg-surface-container rounded-xl"></div>
            <div className="h-32 bg-surface-container rounded-xl"></div>
            <div className="h-32 bg-surface-container rounded-xl"></div>
            <div className="h-32 bg-surface-container rounded-xl"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-80 bg-surface-container rounded-xl"></div>
            <div className="h-80 bg-surface-container rounded-xl"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Mock data for Line Chart if real data isn't returned
  const chartData = [
    { name: 'OCT 01', value: 140 },
    { name: 'OCT 08', value: 180 },
    { name: 'OCT 15', value: 100 },
    { name: 'OCT 22', value: 160 },
    { name: 'TODAY', value: 120 },
  ];

  const pieData = [
    { name: "High Impact", value: 45, color: "#a78bfa" }, // primary
    { name: "Informational", value: 30, color: "#34d399" }, // tertiary
    { name: "Critical Risk", value: 25, color: "#ef4444" } // error
  ];

  return (
    <DashboardLayout title="">
      {/* Welcome Header */}
      <header className="mb-10">
        <h2 className="text-3xl font-black tracking-tight mb-1">Good Morning, {user ? user.name : "Analyst"}</h2>
        <p className="text-on-surface-variant flex items-center gap-2 text-sm">
          <Activity size={16} />
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | Intelligence updates are synchronized.
        </p>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KPICard
          title="Total Articles"
          value={stats?.totalArticles || "1,284"}
          subtitle="+12% from yesterday"
          icon={FileText}
          trendIcon={TrendingUp}
          trendClass="text-tertiary"
          iconClass="text-primary"
          hoverBorder="hover:border-primary"
        />
        <KPICard
          title="High Impact"
          value={stats?.highImpactCount || "42"}
          subtitle="3 requires immediate action"
          icon={AlertOctagon}
          trendIcon={AlertTriangle}
          trendClass="text-error"
          iconClass="text-error"
          hoverBorder="hover:border-error"
        />
        <KPICard
          title="Tracked Topics"
          value={stats?.activeTopics || "12"}
          subtitle="Active monitoring stable"
          icon={Hash}
          trendClass="text-on-surface-variant"
          iconClass="text-tertiary"
          hoverBorder="hover:border-tertiary"
        />
        <KPICard
          title="Competitors"
          value={stats?.activeCompetitors || "8"}
          subtitle="2 New signals detected"
          icon={Users}
          trendClass="text-on-surface-variant"
          iconClass="text-on-surface"
          hoverBorder="hover:border-secondary"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Market Overview: Line Chart */}
        <GlassCard className="lg:col-span-2 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Market Overview</h3>
              <p className="text-xs text-on-surface-variant">Article Volume Over Time (Last 30 Days)</p>
            </div>
            <div className="flex gap-2">
              <button className="text-[10px] px-3 py-1 bg-secondary-container text-on-surface rounded-full border border-outline-variant">30D</button>
              <button className="text-[10px] px-3 py-1 text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors">90D</button>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#a78bfa' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Impact Distribution: Circular Chart */}
        <GlassCard className="p-8 flex flex-col items-center">
          <div className="w-full mb-4">
            <h3 className="text-lg font-bold tracking-tight">Impact Distribution</h3>
            <p className="text-xs text-on-surface-variant">Global Sentiment Weighted</p>
          </div>
          
          <div className="relative w-48 h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-on-surface">84%</span>
              <span className="text-[10px] text-secondary tracking-widest font-bold">ACCURACY</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-on-surface">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Latest Critical Intelligence */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black tracking-tight">Latest Critical Intelligence</h3>
          <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            VIEW ALL FEED <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {latest.slice(0, 3).map((article, index) => {
            const isCritical = article.impact === 'High';
            const borderClass = isCritical ? 'border-l-error' : 'border-l-primary';
            const badgeBg = isCritical ? 'bg-error/10 text-error border-error/20' : 'bg-primary/10 text-primary border-primary/20';
            const badgeText = isCritical ? 'CRITICAL' : 'TRENDING';

            return (
              <GlassCard key={article._id || index} className={`p-5 border-l-4 ${borderClass} flex gap-6 group`} noHover={true}>
                <div className="hidden sm:block w-32 h-32 bg-surface-container rounded-lg overflow-hidden shrink-0 border border-outline-variant">
                  <div className="w-full h-full bg-surface flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                    <FileText size={32} className={isCritical ? "text-error" : "text-primary"} />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeBg}`}>
                      {badgeText}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">Source: {article.source}</span>
                  </div>
                  
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors truncate">
                    {article.title}
                  </h4>
                  
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                    {article.description || "Detailed analysis content not available. Check the original source for full metrics."}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-secondary font-bold">RELEVANCE:</span>
                      <span className="text-sm font-black text-on-surface">{article.relevance_score || "8.4"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-full transition-colors">
                    <BookmarkPlus size={20} />
                  </button>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </section>
    </DashboardLayout>
  );
}