import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { handleApiError } from "../utils/errorHandler";
import { Plus, Edit2, Trash2, Rss, Database, Activity, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Sources() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/sources")
      .then((res) => {
        setSources(res.data);
      })
      .catch(handleApiError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Data Ingestion">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-10">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-on-surface">Source Management</h2>
          <p className="text-on-surface-variant max-w-xl">
            Manage incoming data streams. Equilibrium automatically synchronizes and normalizes intelligence from these sources.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <Plus size={18} />
            <span>Add New Source</span>
          </button>
        </div>
      </div>

      {/* SOURCES GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
          {[1,2,3,4,5,6].map(i => (
             <div key={i} className="bg-surface-container rounded-xl h-[220px]"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sources.map((source, idx) => (
            <motion.div
              key={source._id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container border border-outline-variant p-5 rounded-xl flex flex-col justify-between min-h-[220px] hover:border-outline hover:bg-surface-bright transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant text-on-surface-variant">
                    {source.type === 'rss' ? <Rss size={24} className="text-orange-400" /> : <Database size={24} className="text-blue-400" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">{source.name}</h3>
                    <p className="text-xs text-on-surface-variant line-clamp-1">{source.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-surface-container-highest rounded-lg text-outline-variant hover:text-primary transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 hover:bg-surface-container-highest rounded-lg text-outline-variant hover:text-error transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-4">
                  <div>
                    <p className="text-[10px] text-secondary uppercase font-bold tracking-widest flex items-center gap-1">
                      <Activity size={12} /> Health Status
                    </p>
                    <p className={`text-sm font-bold ${source.is_active !== false ? 'text-tertiary' : 'text-error'}`}>
                      {source.is_active !== false ? 'Healthy' : 'Failing'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-secondary uppercase font-bold tracking-widest flex items-center gap-1">
                      <Database size={12} /> Articles Collected
                    </p>
                    <p className="text-sm font-bold text-on-surface">1,482</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-surface-container-highest px-3 py-2 rounded-lg">
                  <span className="text-[10px] text-on-surface-variant font-mono uppercase">Last Sync</span>
                  <span className="text-xs font-mono font-bold text-primary flex items-center gap-2">
                    {source.last_sync ? new Date(source.last_sync).toLocaleString() : 'Just now'} <RefreshCw size={12} className="animate-spin-slow" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </DashboardLayout>
  );
}
