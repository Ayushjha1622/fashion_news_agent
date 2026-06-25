import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import KPICard from "../components/KPICard";
import GlassCard from "../components/GlassCard";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Activity, Target, Zap, Building2, BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { handleApiError } from "../utils/errorHandler";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics")
      .then((res) => {
        setData(res.data);
      })
      .catch(handleApiError)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <DashboardLayout title="Analytics">
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="h-32 bg-surface-container rounded-xl"></div>
            <div className="h-32 bg-surface-container rounded-xl"></div>
            <div className="h-32 bg-surface-container rounded-xl"></div>
            <div className="h-32 bg-surface-container rounded-xl"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-surface-container rounded-xl"></div>
            <div className="h-96 bg-surface-container rounded-xl"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const pieData = [
    { name: "High Impact", value: data.impactDistribution?.high || 45 },
    { name: "Medium Impact", value: data.impactDistribution?.medium || 35 },
    { name: "Low Impact", value: data.impactDistribution?.low || 20 }
  ];

  const COLORS = ["#ef4444", "#a78bfa", "#34d399"]; // error, primary, tertiary

  const barData = [
    { name: "Topics", value: data.overview?.topics || 12 },
    { name: "Competitors", value: data.overview?.competitors || 8 }
  ];

  return (
    <DashboardLayout title="Analytics">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-outline-variant">
        <div className="p-3 bg-primary-container/20 rounded-xl text-primary border border-primary/20 shadow-lg shadow-primary/10">
          <BarChart3 size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">System Analytics</h1>
          <p className="text-on-surface-variant text-sm mt-1">Deep dive into intelligence gathering performance and metrics.</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KPICard
          title="Average Relevance"
          value="82%"
          subtitle="+2.4% vs last week"
          icon={Target}
          trendIcon={TrendingUp}
          trendClass="text-tertiary"
          iconClass="text-primary"
          hoverBorder="hover:border-primary"
        />
        <KPICard
          title="Average Impact"
          value="Medium"
          subtitle="Stable baseline"
          icon={Zap}
          trendIcon={Minus}
          trendClass="text-on-surface-variant"
          iconClass="text-tertiary"
          hoverBorder="hover:border-tertiary"
        />
        <KPICard
          title="Competitor Hits"
          value="22"
          subtitle="Needs review"
          icon={Building2}
          trendIcon={TrendingDown}
          trendClass="text-error"
          iconClass="text-error"
          hoverBorder="hover:border-error"
        />
        <KPICard
          title="Topics Active"
          value="12"
          subtitle="All Healthy"
          icon={Activity}
          trendIcon={TrendingUp}
          trendClass="text-tertiary"
          iconClass="text-on-surface"
          hoverBorder="hover:border-secondary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Pie Chart */}
        <GlassCard className="p-8 flex flex-col items-center">
          <div className="w-full mb-6">
            <h2 className="text-xl font-bold tracking-tight text-on-surface">Impact Distribution</h2>
            <p className="text-xs text-on-surface-variant">Global Sentiment Weighted</p>
          </div>
          
          <div className="relative w-64 h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  stroke="none"
                  cornerRadius={4}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-on-surface">100%</span>
              <span className="text-[10px] text-secondary tracking-widest font-bold">TOTAL</span>
            </div>
          </div>
          
          <div className="w-full flex justify-center gap-6">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm font-bold text-on-surface">{item.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Bar Chart */}
        <GlassCard className="p-8">
          <div className="w-full mb-8">
            <h2 className="text-xl font-bold tracking-tight text-on-surface">Monitoring Overview</h2>
            <p className="text-xs text-on-surface-variant">Entities Currently Tracked</p>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  cursor={{ fill: '#27272a', opacity: 0.2 }}
                  itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" fill="#a78bfa" radius={[6, 6, 0, 0]} maxBarSize={80}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#a78bfa" : "#34d399"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>

    </DashboardLayout>
  );
}
