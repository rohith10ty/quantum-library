import React from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle, XCircle, ArrowRight, Bookmark } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

export const BookCard = ({ book }) => {
  const { openIssueModal } = useLibrary();

  return (
    <div className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#9df2eb]/40 transition-all duration-300 p-3.5 flex flex-col justify-between shadow-md hover:shadow-[0_0_20px_rgba(157,242,235,0.12)] select-none h-full">
      <div>
        {/* Book Cover Container - Strict 3:4 Aspect Ratio */}
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-[#160d1b] border border-white/10 shrink-0">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Availability Badge */}
          <div className="absolute top-2 right-2">
            {book.available ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/15 text-white border border-white/25 backdrop-blur-md">
                <CheckCircle size={10} />
                <span>{book.availableCopies} Left</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white/50 border border-white/10 backdrop-blur-md">
                <XCircle size={10} />
                <span>Reserved</span>
              </span>
            )}
          </div>

          {/* Category Pill */}
          <div className="absolute bottom-2 left-2 max-w-[85%]">
            <span className="block truncate px-2 py-0.5 rounded-md text-[10px] font-outfit bg-black/85 text-white/90 font-medium border border-white/15 backdrop-blur-md">
              {book.category}
            </span>
          </div>
        </div>

        {/* Book Metadata - Strictly Uniform Fixed Line Heights */}
        <div className="space-y-1 mb-3">
          <div className="h-4 flex items-center justify-between text-[11px] font-outfit text-white/50">
            <span className="truncate">{book.edition}</span>
            <div className="flex items-center gap-1 text-[#f5e2a4] shrink-0">
              <Star size={11} className="fill-[#f5e2a4]" />
              <span className="text-white font-bold">{book.rating}</span>
            </div>
          </div>

          {/* Fixed 2-Line Title Container */}
          <div className="h-10 flex items-center my-0.5">
            <h3
              className="text-[13px] sm:text-sm font-bold text-white group-hover:text-[#9df2eb] transition-colors line-clamp-2 leading-tight font-outfit"
              title={book.title}
            >
              {book.title}
            </h3>
          </div>

          {/* Author */}
          <div className="h-4 flex items-center">
            <p className="text-xs text-white/70 font-outfit truncate" title={book.author}>
              {book.author}
            </p>
          </div>

          {/* Shelf Location */}
          <div className="h-4 flex items-center pt-0.5">
            <p className="text-[10px] text-white/40 font-mono truncate">
              {book.shelf}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2.5 border-t border-white/10 grid grid-cols-2 gap-2 font-outfit text-xs font-semibold mt-auto">
        <Link
          to={`/book/${book.id}`}
          className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <span>Details</span>
          <ArrowRight size={13} />
        </Link>

        {book.available ? (
          <button
            onClick={() => openIssueModal(book)}
            className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold transition-all cursor-pointer shadow-md"
          >
            <Bookmark size={13} className="text-black" />
            <span>Issue</span>
          </button>
        ) : (
          <button
            disabled
            className="py-2 px-2.5 rounded-xl bg-white/5 border border-white/5 text-white/30 cursor-not-allowed text-center"
          >
            Reserved
          </button>
        )}
      </div>
    </div>
  );
};
