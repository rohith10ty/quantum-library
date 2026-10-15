import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Brain, Atom, Binary, Cog, BookOpen, Layers, ArrowUpRight, Bookmark, Globe } from 'lucide-react';
import { CATEGORIES } from '../../data/libraryData';

const ICONS = {
  Cpu,
  Brain,
  Atom,
  Binary,
  Cog,
  BookOpen,
  Bookmark,
  Globe,
};

export const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (catName) => {
    navigate(`/catalog?category=${encodeURIComponent(catName)}`);
  };

  return (
    <section id="categories" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none font-mono">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/80 mb-3">
          <Layers size={14} className="text-white" />
          <span>Curated Disciplines</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-normal uppercase tracking-wide text-white">
          Popular Academic Categories
        </h2>
        <p className="text-sm sm:text-base text-white/70 font-sans mt-3 max-w-2xl mx-auto leading-relaxed">
          Explore comprehensive disciplinary archives, research journals, courseware reserves, and reference literature.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const IconComponent = ICONS[cat.icon] || BookOpen;
          return (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className="group p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      borderColor: `${cat.color}40`,
                      color: cat.color,
                    }}
                  >
                    <IconComponent size={26} />
                  </div>
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80">
                    {cat.count} Titles
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors mb-2.5">
                  {cat.name}
                </h3>

                <p className="text-sm text-white/70 font-sans leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                <span>Browse Shelves</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
