import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { BookCard } from './BookCard';

export const FeaturedBooks = () => {
  const { books } = useLibrary();
  const featured = books.filter((b) => b.featured).slice(0, 8);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none font-mono">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/80 mb-3">
            <Sparkles size={14} className="text-white" />
            <span>Curator's Academic Choice</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal uppercase tracking-wide text-white">
            Featured Textbooks & Treatises
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-sans mt-3 max-w-2xl leading-relaxed">
            Essential reference volumes for current semester syllabi, foundational sciences, and cutting-edge artificial intelligence.
          </p>
        </div>

        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-white hover:underline font-semibold"
        >
          <span>Explore Entire Catalog</span>
          <ArrowRight size={16} className="text-white" />
        </Link>
      </div>

      {/* Grid: 2 Books in a Row on Mobile, 4 on Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {featured.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};
