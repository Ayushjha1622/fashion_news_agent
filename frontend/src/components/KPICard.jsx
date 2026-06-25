import React from 'react';
import GlassCard from './GlassCard';

export default function KPICard({ title, value, subtitle, icon: Icon, trendIcon: TrendIcon, trendClass = "text-on-surface-variant", hoverBorder = "hover:border-primary", iconClass = "text-primary" }) {
  return (
    <GlassCard className={`p-6 flex flex-col justify-between group ${hoverBorder}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-secondary text-sm font-medium">{title}</span>
        {Icon && <Icon className={iconClass} size={20} />}
      </div>
      <div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className={`text-[10px] flex items-center gap-1 ${trendClass}`}>
          {TrendIcon && <TrendIcon size={12} />}
          {subtitle}
        </div>
      </div>
    </GlassCard>
  );
}
