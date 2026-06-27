import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { handleApiError } from "../utils/errorHandler";
import { Filter, Calendar, ChevronDown, ChevronRight, Share, Bookmark, Globe, Plus, AlertTriangle, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Feed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [briefArticles, setBriefArticles] = useState(() => JSON.parse(localStorage.getItem('feed_briefArticles') || '[]'));
  
  const [sourceFilter, setSourceFilter] = useState(localStorage.getItem('feed_sourceFilter') || "All Signals");
  const [impactFilter, setImpactFilter] = useState(localStorage.getItem('feed_impactFilter') || "All Impacts");

  const filteredArticles = articles.filter(article => {
    const matchSource = sourceFilter === "All Signals" || article.source === sourceFilter;
    const impactVal = impactFilter.split(" ")[0]; // "High Impact" -> "High"
    const matchImpact = impactFilter === "All Impacts" || article.impact === impactVal || article.impact === impactVal.toUpperCase();
    return matchSource && matchImpact;
  });

  const handleSaveView = () => {
    localStorage.setItem('feed_sourceFilter', sourceFilter);
    localStorage.setItem('feed_impactFilter', impactFilter);
    toast.success("View preferences saved successfully!");
  };

  const handleAddToBrief = () => {
    if (!selectedArticle) return;
    
    const isAlreadyAdded = briefArticles.includes(selectedArticle._id);
    let newBriefArticles;
    
    if (isAlreadyAdded) {
        newBriefArticles = briefArticles.filter(id => id !== selectedArticle._id);
        toast.success("Removed from brief");
    } else {
        newBriefArticles = [...briefArticles, selectedArticle._id];
        toast.success("Added to Daily Brief!");
    }
    
    setBriefArticles(newBriefArticles);
    localStorage.setItem('feed_briefArticles', JSON.stringify(newBriefArticles));
  };

  useEffect(() => {
    api.get("/latest")
      .then((res) => {
        setArticles(res.data.articles);
        if (res.data.articles.length > 0) {
          setSelectedArticle(res.data.articles[0]);
        }
      })
      .catch(handleApiError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Intelligence Feed">
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-surface-container rounded-xl"></div>
          <div className="flex gap-4">
            <div className="w-[450px] h-screen bg-surface-container rounded-xl"></div>
            <div className="flex-1 h-screen bg-surface-container rounded-xl"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Intelligence Feed">
      <div className="h-full flex flex-col -m-8"> {/* Negative margin to break out of layout padding for full height */}
        
        {/* Filter Header */}
        <section className="p-6 border-b border-outline-variant flex items-center gap-4 bg-surface-container-low/50 overflow-x-auto custom-scrollbar">
          <div className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Source</label>
            <select 
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-surface-container border border-outline-variant rounded-lg text-xs py-1.5 pl-2 pr-8 focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer">
              <option>All Signals</option>
              <option>Reuters</option>
              <option>Bloomberg</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Impact</label>
            <select 
              value={impactFilter}
              onChange={(e) => setImpactFilter(e.target.value)}
              className="bg-surface-container border border-outline-variant rounded-lg text-xs py-1.5 pl-2 pr-8 focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer">
              <option>All Impacts</option>
              <option>High Impact</option>
              <option>Medium Impact</option>
              <option>Low Impact</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 min-w-[140px]">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Date Range</label>
            <div className="flex items-center bg-surface-container border border-outline-variant rounded-lg px-2 py-1.5 gap-2 text-on-surface-variant">
              <Calendar size={14} />
              <span className="text-xs">Last 24 Hours</span>
            </div>
          </div>
          <div className="ml-auto self-end">
            <button onClick={handleSaveView} className="flex items-center gap-2 bg-primary text-on-primary font-bold text-xs px-4 py-2 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/10">
              <Filter size={14} /> Save View
            </button>
          </div>
        </section>

        {/* Content Split Pane */}
        <section className="flex-1 flex overflow-hidden">
          
          {/* Left: Article List */}
          <div className="w-[450px] border-r border-outline-variant flex flex-col bg-surface-container-lowest relative z-10 overflow-y-auto custom-scrollbar">
            <div className="p-4 flex justify-between items-center border-b border-outline-variant bg-surface-container-low/30 sticky top-0 backdrop-blur z-20">
              <span className="text-xs text-on-surface-variant font-medium">{filteredArticles.length} Signals Found</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-on-surface-variant">SORT BY</span>
                <button className="text-xs flex items-center gap-1 font-bold">Relevance <ChevronDown size={14} /></button>
              </div>
            </div>

            <div className="divide-y divide-outline-variant">
              {filteredArticles.map((article, idx) => {
                const isActive = selectedArticle?._id === article._id;
                const isCritical = article.impact === 'High';
                
                return (
                  <div 
                    key={article.url || idx}
                    onClick={() => setSelectedArticle(article)}
                    className={`p-6 cursor-pointer transition-all duration-200 border-l-4 ${
                      isActive 
                        ? 'border-l-primary bg-surface-container-highest' 
                        : 'border-l-transparent hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] font-black uppercase tracking-tighter ${isCritical ? 'text-error' : 'text-primary'}`}>
                        {article.impact} Impact
                      </span>
                    </div>
                    <h3 className={`text-md font-bold leading-snug mb-3 transition-colors ${isActive ? 'text-primary' : 'hover:text-primary'}`}>
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-on-surface-variant">{article.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-on-surface-variant font-bold">RELEVANCE</span>
                        <div className="w-12 h-1.5 bg-secondary-container rounded-full overflow-hidden">
                          <div className="h-full relevance-gradient" style={{ width: `${article.relevance_score || 85}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-primary">{article.relevance_score || 85}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Analysis Panel */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-surface relative">
            <AnimatePresence mode="wait">
              {selectedArticle ? (
                <motion.div 
                  key={selectedArticle._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-4xl mx-auto p-12 pb-32"
                >
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                        Signal Verified
                      </span>
                      <span className="text-on-surface-variant text-sm flex items-center gap-1">
                        <Calendar size={14} /> {new Date(selectedArticle.published_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-4xl font-black leading-tight mb-8">{selectedArticle.title}</h2>
                    
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-surface-container p-4 rounded-xl border border-outline-variant">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Source Domain</p>
                        <p className="font-bold text-primary">{selectedArticle.source}</p>
                      </div>
                      <div className="bg-surface-container p-4 rounded-xl border border-outline-variant">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Impact Level</p>
                        <p className={`font-bold ${selectedArticle.impact === 'High' ? 'text-error' : 'text-tertiary'}`}>
                          {selectedArticle.impact}
                        </p>
                      </div>
                      <div className="bg-surface-container p-4 rounded-xl border border-outline-variant">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Confidence</p>
                        <p className="font-bold">92% Reliable</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-12">
                    <section>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-4 border-b border-outline-variant pb-2 flex items-center gap-2">
                         Executive Summary
                      </h4>
                      <div className="bg-surface-container-high/40 p-6 rounded-xl border border-outline-variant leading-relaxed text-on-surface/90 text-sm">
                        <p>{selectedArticle.description}</p>
                      </div>
                    </section>

                    {selectedArticle.summary?.length > 0 && (
                      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-4 border-b border-outline-variant pb-2">Key Takeaways</h4>
                          <ul className="space-y-4">
                            {selectedArticle.summary.map((point, i) => (
                              <li key={i} className="flex gap-3">
                                <CheckCircle className="text-tertiary shrink-0 mt-0.5" size={16} />
                                <p className="text-sm">{point}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-on-surface-variant">
                  Select an article to view details
                </div>
              )}
            </AnimatePresence>

            {/* Floating Action Bar */}
            {selectedArticle && (
              <div className="fixed bottom-8 right-8 left-[calc(450px+16rem)]">
                <div className="bg-[rgba(12,12,15,0.8)] backdrop-blur-[12px] border border-outline-variant rounded-2xl p-4 flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-6 px-2">
                    <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-bold">
                      <Share size={16} /> Share
                    </button>
                    <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-bold">
                      <Bookmark size={16} /> Save
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={selectedArticle.url} target="_blank" rel="noreferrer" className="bg-surface-container text-on-surface border border-outline-variant px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-secondary-container transition-all flex items-center gap-2">
                      <Globe size={16} /> Full Source Article
                    </a>
                    <button 
                      onClick={handleAddToBrief}
                      className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
                        briefArticles.includes(selectedArticle._id)
                          ? 'bg-surface-container-highest text-primary border border-primary/30' 
                          : 'bg-primary text-on-primary hover:brightness-110'
                      }`}>
                      {briefArticles.includes(selectedArticle._id) ? (
                        <><CheckCircle size={16} /> In Brief</>
                      ) : (
                        <><Plus size={16} /> Add to Brief</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}