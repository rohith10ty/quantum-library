import React from 'react';
import { Globe, Users, ShieldCheck, Truck, Server, Bookmark, ArrowRight } from 'lucide-react';
import { LIBRARY_SERVICES } from '../../data/libraryData';

const ICONS = {
  Globe,
  Users,
  ShieldCheck,
  Truck,
  Server,
  Bookmark,
};

export const ServicesSection = () => {
  return (
    <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none font-mono">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/80 mb-3">
          <Server size={14} className="text-white" />
          <span>Campus Academic Infrastructure</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-normal uppercase tracking-wide text-white">
          Library Services & Research Facilities
        </h2>
        <p className="text-sm sm:text-base text-white/70 font-sans mt-3 max-w-2xl mx-auto leading-relaxed">
          State-of-the-art digital infrastructure designed to empower undergraduate coursework, post-graduate dissertations, and faculty investigations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LIBRARY_SERVICES.map((srv) => {
          const Icon = ICONS[srv.icon] || Globe;
          return (
            <div
              key={srv.id}
              className="p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center">
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {srv.title}
                </h3>

                <p className="text-sm text-white/70 font-sans leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-white/10 flex items-center gap-2 text-sm text-white font-bold group-hover:text-white">
                <span>Access Facility</span>
                <ArrowRight size={16} className="text-white" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
