import { useEffect, useState } from "react";
import api, { nodeApi } from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { handleApiError } from "../utils/errorHandler";
import { FileText, AlignLeft, Rss, Share, Eye, Radar, TrendingUp, CheckCircle, Upload, Globe, Megaphone } from "lucide-react";
import GlassCard from "../components/GlassCard";

export default function DailyBrief() {
  const [summary, setSummary] = useState(null);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/dashboard-summary").then((res) => setSummary(res.data)),
      api.get("/latest").then((res) => setLatest(res.data.articles))
    ])
      .catch(handleApiError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Daily Brief">
        <div className="animate-pulse space-y-8 max-w-[1200px] mx-auto">
          <div className="h-32 bg-surface-container rounded-xl"></div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 h-96 bg-surface-container rounded-xl"></div>
            <div className="col-span-12 lg:col-span-4 h-96 bg-surface-container rounded-xl"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Daily Brief">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-primary-container text-on-primary-container text-[10px] font-bold rounded uppercase tracking-wider">Restricted Access</span>
              <span className="text-secondary text-sm font-medium tracking-tight">Report ID: EB-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000)}</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface">
              Daily Brief — {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h1>
            <p className="text-on-surface-variant mt-1">Intelligence summary of market movements, competitor signals, and emerging trends.</p>
          </div>
          <button 
            onClick={() => window.open(`${nodeApi.defaults.baseURL}/api/pdf/daily-brief`, "_blank")}
            className="bg-primary text-on-primary px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <FileText size={18} />
            Generate Full PDF Report
          </button>
        </section>

        {/* Multi-column Layout */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column: Executive Summary and Top Stories */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            
            {/* Executive Summary */}
            <GlassCard className="p-8 relative overflow-hidden" noHover={true}>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlignLeft size={80} />
              </div>
              <h3 className="text-tertiary font-bold text-xs uppercase tracking-widest mb-4">Executive Summary</h3>
              <p className="text-lg leading-relaxed text-on-surface mb-6">
                {summary?.executive_summary || "Today's intelligence landscape shows a critical pivot in the quantum computing sector, with three major players announcing unified architectural standards. Market volatility in the semiconductor space remains high, driven by new export regulations. Internal sentiment analysis suggests a 15% increase in competitor R&D velocity over the last 48 hours."}
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-outline-variant pt-6">
                <div>
                  <p className="text-[10px] text-secondary uppercase font-bold tracking-wider mb-1">Threat Level</p>
                  <p className="text-sm font-bold text-error flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                    Elevated
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-secondary uppercase font-bold tracking-wider mb-1">Signal Strength</p>
                  <p className="text-sm font-bold">94% Confidence</p>
                </div>
                <div>
                  <p className="text-[10px] text-secondary uppercase font-bold tracking-wider mb-1">Impact Radius</p>
                  <p className="text-sm font-bold">Global / Tier 1</p>
                </div>
              </div>
            </GlassCard>

            {/* Top Stories */}
            <div>
              <h3 className="text-on-surface font-bold text-xl tracking-tight mb-6 flex items-center gap-2">
                <Rss className="text-primary" size={24} />
                Priority Intelligence Stories
              </h3>
              <div className="space-y-4">
                {latest.slice(0, 3).map((article, idx) => (
                  <div key={article._id || idx} className="group p-5 bg-surface-container hover:bg-surface-container-high border border-outline-variant rounded-xl transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${idx === 0 ? 'text-primary bg-primary/10' : idx === 1 ? 'text-tertiary bg-tertiary/10' : 'text-on-secondary-container bg-secondary-container'}`}>
                        {idx === 0 ? 'M&A ACTIVITY' : idx === 1 ? 'GOVERNMENT POLICY' : 'INFRASTRUCTURE'}
                      </span>
                      <span className="text-[10px] text-secondary">{idx * 2 + 1}h ago</span>
                    </div>
                    <h4 className={`text-lg font-bold transition-colors mb-2 ${idx === 0 ? 'group-hover:text-primary' : idx === 1 ? 'group-hover:text-tertiary' : 'group-hover:text-primary'}`}>
                      {article.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                      {article.description || "No description provided for this priority intelligence signal."}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Eye size={12} /> {(Math.random() * 5).toFixed(1)}k Views</span>
                      <span className="flex items-center gap-1 hover:text-on-surface transition-colors"><Share size={12} /> Share</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Competitor Activity and Topic Trends */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            
            {/* Competitor Activity Feed */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Radar className="text-primary" size={20} />
                  Competitor Activity
                </h3>
                <span className="text-[10px] text-primary hover:underline cursor-pointer">View All</span>
              </div>
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant">
                {[
                  { name: "Apex Systems", time: "42m ago", desc: "Published v4.2 of their SDK on GitHub.", icon: Upload, color: "text-primary" },
                  { name: "Nova Logic", time: "2h ago", desc: "Hired 14 Senior Cryptographers in Zurich.", icon: Globe, color: "text-tertiary" },
                  { name: "Zentith Corp", time: "5h ago", desc: "CFO stepped down unexpectedly.", icon: Megaphone, color: "text-error" },
                ].map((comp, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full border border-outline-variant bg-surface-container-high flex items-center justify-center z-10">
                      <comp.icon size={12} className={comp.color} />
                    </div>
                    <p className="text-xs text-secondary mb-1">{comp.name} · <span className="text-[10px]">{comp.time}</span></p>
                    <p className="text-sm font-medium">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Trend Sparklines */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-6">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-6">
                <TrendingUp className="text-tertiary" size={20} />
                Topic Velocity
              </h3>
              <div className="space-y-5">
                {[
                  { name: "Edge AI", val: "+14.2%", color: "bg-tertiary text-tertiary", h: [3,5,4,6,8] },
                  { name: "Post-Quantum", val: "+8.1%", color: "bg-tertiary text-tertiary", h: [2,3,6,5,7] },
                  { name: "Green Hydrogen", val: "-2.4%", color: "bg-secondary text-error", h: [6,7,5,4,3] },
                ].map((trend, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">{trend.name}</p>
                      <p className={`text-[10px] font-bold ${trend.color.split(' ')[1]}`}>{trend.val}</p>
                    </div>
                    <div className="h-[32px] w-[80px] flex items-end gap-0.5">
                      {trend.h.map((h, idx) => (
                         <div key={idx} className={`w-2 ${trend.color.split(' ')[0]} rounded-t-sm`} style={{ height: `${h*4}px`, opacity: 0.3 + (idx * 0.15) }}></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Area: Monitoring Stats and Analyst Recommendations */}
        <footer className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-outline-variant pt-10 pb-20">
          
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">System Monitoring Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: "482k", label: "Sources Polled" },
                { val: "1.2s", label: "Avg. Latency" },
                { val: "0.03%", label: "False Positive Rate" },
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-surface-container-low border border-outline-variant rounded-lg">
                  <p className="text-2xl font-bold text-on-surface tracking-tighter">{stat.val}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Analyst Recommendations</h3>
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl">
              <ul className="space-y-3">
                {[
                  "Immediate review of Tier 1 semiconductor suppliers in Southeast Asia required.",
                  "Re-allocate intelligence resources to monitor 'Post-Quantum' encryption breakthroughs.",
                  "Prepare stakeholder brief regarding OmniCorp's recent patent filings in edge AI."
                ].map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="text-primary shrink-0 mt-0.5" size={18} />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>

      </div>
    </DashboardLayout>
  );
}