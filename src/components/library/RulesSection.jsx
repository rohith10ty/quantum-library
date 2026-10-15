import React, { useState } from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { RULES_AND_GUIDELINES } from '../../data/libraryData';

export const RulesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="rules" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none font-outfit">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/80 mb-3">
          <BookOpen size={14} className="text-white" />
          <span>Governance & Circulation Code</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-wide text-white">
          Library Rules & Guidelines
        </h2>
        <p className="text-sm sm:text-base text-white/70 font-normal mt-3 max-w-2xl mx-auto leading-relaxed">
          Please review the borrowing privileges, renewals, conduct standards, and resource return deadlines for Quantum University Library.
        </p>
      </div>

      {/* Tabs: Strictly 2 in a Row (2 Rows of 2) */}
      <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto mb-8 w-full">
        {RULES_AND_GUIDELINES.map((group, idx) => (
          <button
            key={group.category}
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-3.5 rounded-xl border text-xs sm:text-sm font-bold uppercase tracking-wider transition-all text-center cursor-pointer ${
              activeTab === idx
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {group.category}
          </button>
        ))}
      </div>

      {/* Tab Detail Panel: Clean Justified List with Tick Points (No individual card boxes) */}
      <div className="p-6 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl max-w-5xl mx-auto">
        <div className="text-sm font-bold uppercase tracking-widest text-white mb-6 pb-3 border-b border-white/10 flex items-center gap-2.5">
          <BookOpen size={18} className="text-white" />
          <span>{RULES_AND_GUIDELINES[activeTab].category}</span>
        </div>

        {/* Clean Tick Points in Lines, Text Justified (Attachment 4) */}
        <div className="space-y-3">
          {RULES_AND_GUIDELINES[activeTab].rules.map((rule, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 py-3 border-b border-white/5 last:border-b-0"
            >
              <CheckCircle2 size={18} className="text-white shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal text-justify flex-1">
                {rule}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-white/60 font-mono">
          <span>Official Academic Regulations &bull; Quantum Library Handbook 2026</span>
          <span className="text-white font-bold">RFID Scanners Active at Exit</span>
        </div>
      </div>
    </section>
  );
};
