import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import EntityCard from "../components/EntityCard";
import { handleApiError } from "../utils/errorHandler";
import { Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    api.get("/topics")
      .then((res) => {
        setTopics(res.data?.data || res.data);
      })
      .catch(handleApiError)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (name) => {
    api.delete(`/topics/${name}`)
      .then(() => {
        setTopics(topics => topics.filter(t => t.name !== name));
      })
      .catch(handleApiError);
  };

  const handleAddTopic = () => {
    const name = window.prompt("Enter new topic name:");
    if (!name) return;
    api.post("/topics", { name })
      .then(() => {
        setTopics([...topics, { name }]);
      })
      .catch(handleApiError);
  };

  return (
    <DashboardLayout title="Monitoring Management">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-10">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-on-surface">Precision Surveillance</h2>
          <p className="text-on-surface-variant max-w-xl">
            Configure high-fidelity monitoring targets. Equilibrium parses data streams to deliver context-aware alerts for your specified topics and competitors.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleAddTopic} className="bg-primary text-on-primary px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <Plus size={18} />
            <span>Add New Topic</span>
          </button>
        </div>
      </div>

      {/* TABBED INTERFACE */}
      <div className="flex border-b border-outline-variant mb-8 gap-10">
        <Link to="/topics" className="text-primary border-b-2 border-primary py-4 text-sm font-bold tracking-wide transition-all uppercase px-1">
          Topics
          <span className="ml-2 px-2 py-0.5 rounded-full bg-surface-container-highest text-[10px] text-secondary">{topics.length}</span>
        </Link>
        <Link to="/competitors" className="py-4 text-sm font-bold tracking-wide transition-all uppercase px-1 text-secondary hover:text-on-surface">
          Competitors
          <span className="ml-2 px-2 py-0.5 rounded-full bg-surface-container-highest text-[10px] text-secondary">8</span>
        </Link>
      </div>

      {/* TOPICS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
          {[1,2,3,4,5,6].map(i => (
             <div key={i} className="bg-surface-container rounded-xl h-[180px]"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {topics.map((topic, idx) => (
            <EntityCard 
              key={topic._id || idx}
              type="topic"
              title={topic.name}
              status={topic.is_active !== false ? "Active Monitoring" : "Paused"}
              date={new Date(topic.created_at || Date.now()).toISOString().split('T')[0]}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* ATMOSPHERIC ELEMENT */}
      <div className="mt-16 relative h-64 rounded-2xl overflow-hidden border border-outline-variant">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute bottom-6 left-8 z-20">
          <h4 className="text-xl font-black text-on-surface">Intelligence Stream Latency: 42ms</h4>
          <p className="text-on-surface-variant text-sm">Monitoring systems operational across all sectors. Real-time parity achieved.</p>
        </div>
      </div>

    </DashboardLayout>
  );
}