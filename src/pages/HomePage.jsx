import React, { useState } from 'react';
import { HeroIntro } from '../components/hero/HeroIntro';
import { StackMotionSection } from '../components/hero/StackMotionSection';
import { FeaturedBooks } from '../components/library/FeaturedBooks';
import { CategoriesSection } from '../components/library/CategoriesSection';
import { ServicesSection } from '../components/library/ServicesSection';
import { RulesSection } from '../components/library/RulesSection';
import { AboutSection } from '../components/library/AboutSection';
import { BookCard } from '../components/library/BookCard';
import { Search, Filter, BookOpen, ArrowRight } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { books } = useLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Romance & Classic Fiction',
    'Literature & Poetry',
    'Knowledge & Science',
    'Philosophy & Wisdom',
    'History & Society',
    'Computer Science & AI',
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative w-full">
      {/* ======================================================== */}
      {/* 1. HERO PART: The Iconic 3D Stack Motion Scroll Effect   */}
      {/* ======================================================== */}
      <section className="relative w-full">
        {/* Intro Section: The Next Evolution (3x3 grid with GSAP 3D ScrollTrigger tilt) */}
        <HeroIntro />

        {/* Stack 1: The Living Archives (27 book covers in curved arc motion) */}
        <StackMotionSection
          title="The Living Archives"
          stackIndex={1}
          effectType="effect-1"
        />

        {/* Stack 2: Chronicles of Literature (27 book covers in 360° vortex) */}
        <StackMotionSection
          title="Chronicles of Literature"
          stackIndex={2}
          effectType="effect-2"
        />

        {/* Stack 3: The Odyssey of Wisdom (27 book covers in diagonal wave) */}
        <StackMotionSection
          title="The Odyssey of Wisdom"
          stackIndex={3}
          effectType="effect-3"
        />
      </section>

      {/* ======================================================== */}
      {/* 2. CATALOG & SEARCH BAR (Immediately after 3D effects)    */}
      {/* ======================================================== */}
      <section id="search-section" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono select-none">
        <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                placeholder="Search by title, author, topic, or ISBN (e.g. Algorithms, Russell, Quantum)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm sm:text-base focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
            <Link
              to="/catalog"
              className="w-full md:w-auto px-7 py-4 rounded-xl bg-white text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg whitespace-nowrap cursor-pointer"
            >
              <span>Full Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Category Filter Pills: Clean Purple & White Theme */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FEATURED BOOKS SECTION                                 */}
      {/* ======================================================== */}
      <FeaturedBooks />

      {/* ======================================================== */}
      {/* 4. MAIN BOOKS PRODUCT LISTINGS GRID                       */}
      {/* ======================================================== */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-outfit select-none">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/80 mb-2.5">
              <BookOpen size={14} className="text-white" />
              <span>Open Circulation Stacks</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal uppercase tracking-wide text-white">
              Library Volumes Available for Issue
            </h2>
          </div>
          <span className="text-sm text-white/60">
            Showing {filteredBooks.length} of {books.length} Books
          </span>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredBooks.slice(0, 16).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-white/60 text-sm">No books found matching your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-white/10 text-xs uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {filteredBooks.length > 16 && (
          <div className="text-center mt-12">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs uppercase tracking-wider text-white transition-colors"
            >
              <span>View All {books.length} Books in Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 5. POPULAR CATEGORIES SECTION                            */}
      {/* ======================================================== */}
      <CategoriesSection />

      {/* ======================================================== */}
      {/* 6. ABOUT THE COLLEGE LIBRARY SECTION                      */}
      {/* ======================================================== */}
      <AboutSection />

      {/* ======================================================== */}
      {/* 7. LIBRARY SERVICES & RESEARCH SECTION                    */}
      {/* ======================================================== */}
      <ServicesSection />

      {/* ======================================================== */}
      {/* 8. LIBRARY RULES & GUIDELINES SECTION                     */}
      {/* ======================================================== */}
      <RulesSection />
    </div>
  );
};
