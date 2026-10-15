import React from 'react';
import { BookOpen, Award, Users, Database, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none font-outfit">
      
      {/* Top Editorial Narrative: Centered Layout */}
      <div className="max-w-4xl mx-auto mb-14 text-center flex flex-col items-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/80">
          <Sparkles size={14} className="text-white" />
          <span>Center of Scholarly Excellence</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-wide text-white leading-tight text-center">
          About Quantum University Central Library
        </h2>

        <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal text-center max-w-3xl mx-auto">
          Established as the intellectual nucleus of Quantum University, the Central Library merges traditional physical scholarship with state-of-the-art computational infrastructure. Spanning five modern architectural floors, our collections support undergraduate discoveries, doctoral dissertations, and world-class faculty publications.
        </p>

        <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal text-center max-w-3xl mx-auto">
          With fully integrated RFID circulation, automated book-drop kiosks, 24/7 cloud repository access, and high-performance computing clusters for machine learning and scientific modeling, the library remains the premier catalyst for research and innovation.
        </p>

        {/* 4 Core Features Strictly in a Single Row on Desktop (or 2 in a row on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3 w-full text-left">
          {[
            'Direct inter-university lending network',
            'Subscribed to IEEE, ACM, Springer & JSTOR',
            'High-speed fiber & silent research zones',
            'Comprehensive course reserves desk',
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-white/85 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-3.5 rounded-xl transition-colors"
            >
              <CheckCircle2 size={16} className="text-white shrink-0" />
              <span className="leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Stat Boxes: Strictly 2 in a Row (2 Rows of 2) */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto w-full">
        <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 flex flex-col justify-between shadow-xl transition-all duration-300">
          <BookOpen size={24} className="text-white mb-3" />
          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">120K+</div>
            <div className="text-xs sm:text-sm text-white/60 leading-tight">Physical Volumes on Open Shelves</div>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 flex flex-col justify-between shadow-xl transition-all duration-300">
          <Database size={24} className="text-white mb-3" />
          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">65K+</div>
            <div className="text-xs sm:text-sm text-white/60 leading-tight">Peer-Reviewed E-Journals & E-Books</div>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 flex flex-col justify-between shadow-xl transition-all duration-300">
          <Users size={24} className="text-white mb-3" />
          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">1,200+</div>
            <div className="text-xs sm:text-sm text-white/60 leading-tight">Silent & Collaborative Study Seats</div>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 flex flex-col justify-between shadow-xl transition-all duration-300">
          <Award size={24} className="text-white mb-3" />
          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">Top 1%</div>
            <div className="text-xs sm:text-sm text-white/60 leading-tight">Ranked University Research Facility</div>
          </div>
        </div>
      </div>
    </section>
  );
};
