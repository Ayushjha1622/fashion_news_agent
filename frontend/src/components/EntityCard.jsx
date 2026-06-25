import React from 'react';
import { Edit2, Trash2, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EntityCard({ title, type = "topic", status = "Active Monitoring", date, icon: Icon, description, badgeText, badgeColor = "primary", onDelete }) {
  const isCompetitor = type === 'competitor';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container border border-outline-variant p-5 rounded-xl flex flex-col justify-between min-h-[180px] hover:border-outline hover:bg-surface-bright transition-all"
    >
      {isCompetitor ? (
        // Competitor Layout
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant text-on-surface-variant">
                {Icon ? <Icon size={32} /> : <Activity size={32} />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-on-surface">{title}</h3>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">{description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant mt-4">
            <div className="flex gap-2">
              {badgeText && (
                <span className={`px-2 py-1 bg-surface-container-highest rounded text-[10px] text-${badgeColor} font-mono uppercase tracking-tighter`}>
                  {badgeText}
                </span>
              )}
            </div>
            <Link to={`/feed?competitor=${encodeURIComponent(title)}`} className="text-primary hover:underline text-xs font-bold uppercase tracking-widest">
              Detail View
            </Link>
          </div>
        </div>
      ) : (
        // Topic Layout
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className={`text-[10px] uppercase font-black tracking-widest ${status.includes('Active') ? 'text-tertiary' : 'text-secondary'}`}>
                {status}
              </span>
              <h3 className="text-lg font-bold text-on-surface">{title}</h3>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-surface-container-highest rounded-lg text-outline-variant hover:text-primary transition-colors">
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => onDelete && onDelete(title)}
                className="p-2 hover:bg-surface-container-highest rounded-lg text-outline-variant hover:text-error transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-secondary uppercase font-bold">Created</p>
              <p className="text-xs font-mono text-on-surface-variant">{date || new Date().toISOString().split('T')[0]}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={status.includes('Active')} className="sr-only peer" />
              <div className="w-10 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      )}
    </motion.div>
  );
}
