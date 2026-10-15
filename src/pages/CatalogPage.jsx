import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Layers, CheckCircle2, XCircle } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/library/BookCard';

export const CatalogPage = () => {
  const { books } = useLibrary();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all', 'available', 'unavailable'
  const [sortBy, setSortBy] = useState('title'); // 'title', 'rating', 'year'

  // Pre-filter if category passed in URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const categories = [
    'All',
    'Romance & Classic Fiction',
    'Literature & Poetry',
    'Knowledge & Science',
    'Philosophy & Wisdom',
    'History & Society',
    'Computer Science & AI',
  ];

  const filteredBooks = books
    .filter((book) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.shelf.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'All' || book.category === selectedCategory;

      const matchesAvailability =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && book.available) ||
        (availabilityFilter === 'unavailable' && !book.available);

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      return 0;
    });

  return (
    <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono select-none min-h-screen">
      {/* Page Title & Breadcrumb */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/80 mb-3">
          <BookOpen size={14} className="text-white" />
          <span>Online Public Access Catalog (OPAC)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-wide text-white">
          Book Search & Circulation Catalog
        </h1>
        <p className="text-sm sm:text-base text-white/70 font-sans mt-3 max-w-2xl leading-relaxed">
          Search, filter, inspect shelf locations, and issue print volumes directly to your university student account.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-md mb-10 space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
          <input
            type="text"
            placeholder="Search by book title, author name, ISBN, or shelf call number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm sm:text-base focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>

        {/* Categories Bar */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/70 mb-2.5 font-bold">
            Disciplinary Categories
          </label>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters: Availability & Sort */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="text-white/60 uppercase text-xs font-semibold">Availability:</span>
            {[
              { id: 'all', label: 'All Volumes' },
              { id: 'available', label: 'Available Only' },
              { id: 'unavailable', label: 'Checked Out' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setAvailabilityFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg border text-xs sm:text-sm transition-colors cursor-pointer ${
                  availabilityFilter === f.id
                    ? 'border-white bg-white text-black font-bold shadow-md'
                    : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-white/60 uppercase text-xs font-semibold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#140822] border border-white/20 rounded-lg px-3.5 py-1.5 text-white text-xs sm:text-sm focus:outline-none focus:border-white"
            >
              <option value="title">Title (A - Z)</option>
              <option value="rating">Highest Rated</option>
              <option value="year">Newest Edition</option>
            </select>
          </div>
        </div>
      </div>

      {/* Book Grid */}
      <div className="flex items-center justify-between mb-6 text-xs text-white/50">
        <span>Showing {filteredBooks.length} matched volumes</span>
        {(searchTerm || selectedCategory !== 'All' || availabilityFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setAvailabilityFilter('all');
            }}
            className="text-white hover:underline cursor-pointer font-bold"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-white/[0.02] border border-white/10">
          <BookOpen size={36} className="mx-auto text-white/20 mb-4" />
          <h3 className="text-base font-bold text-white mb-2">No Matching Titles Found</h3>
          <p className="text-xs text-white/60 max-w-sm mx-auto font-sans">
            Try adjusting your search query, selecting another category, or clearing the availability filter.
          </p>
        </div>
      )}
    </div>
  );
};
