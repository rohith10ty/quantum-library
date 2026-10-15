import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  CheckCircle,
  XCircle,
  Bookmark,
  MapPin,
  Calendar,
  Layers,
  BookOpen,
  Share2,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/library/BookCard';

export const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, openIssueModal } = useLibrary();

  const book = books.find((b) => b.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!book) {
    return (
      <div className="pt-32 pb-24 px-4 text-center min-h-[60vh] font-mono">
        <h2 className="text-xl text-white mb-4">Volume Not Found</h2>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-xs"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </Link>
      </div>
    );
  }

  const sameCategoryBooks = books.filter((b) => b.category === book.category && b.id !== book.id);
  const otherBooks = books.filter((b) => b.category !== book.category && b.id !== book.id);
  const similarBooks = [...sameCategoryBooks, ...otherBooks].slice(0, 4);

  return (
    <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono select-none min-h-screen">
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-white/70 hover:text-white transition-colors font-semibold"
        >
          <ArrowLeft size={16} />
          <span>Back to previous view</span>
        </button>
      </div>

      {/* Main Details Card */}
      <div className="p-6 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-md mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Book Cover */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                {book.available ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    <CheckCircle size={14} />
                    <span>{book.availableCopies} Available</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-rose-500/25 text-rose-300 border border-rose-500/40 backdrop-blur-md">
                    <XCircle size={14} />
                    <span>Checked Out</span>
                  </span>
                )}
              </div>
            </div>

            {/* Quick Action Button under Cover */}
            <div className="w-full max-w-xs mt-6">
              {book.available ? (
                <button
                  onClick={() => openIssueModal(book)}
                  className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-extrabold text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bookmark size={16} className="text-black" />
                  <span>Issue This Volume</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white/40 font-bold text-sm uppercase tracking-wider cursor-not-allowed"
                >
                  Currently Reserved
                </button>
              )}
            </div>
          </div>

          {/* Metadata & Description */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                <span className="px-3 py-1 rounded-md text-xs uppercase tracking-wider bg-[#c471e1]/20 text-[#d09df2] border border-[#c471e1]/30 font-bold">
                  {book.category}
                </span>
                <span className="px-3 py-1 rounded-md text-xs uppercase tracking-wider bg-white/5 text-white/80 border border-white/10">
                  {book.edition}
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f5e2a4]/10 text-[#f5e2a4] border border-[#f5e2a4]/20 text-xs">
                  <Star size={14} className="fill-[#f5e2a4]" />
                  <span className="font-bold">{book.rating}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-white leading-tight">
                {book.title}
              </h1>

              <div className="text-base sm:text-lg text-[#9df2eb] font-sans mt-2.5 font-medium">
                By {book.author}
              </div>
            </div>

            {/* Shelf & Call Number Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm">
              <div>
                <div className="text-white/50 text-xs uppercase">Shelf Location</div>
                <div className="font-bold text-white mt-1 text-sm sm:text-base">{book.shelf}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase">ISBN-13</div>
                <div className="font-bold text-white mt-1 text-sm sm:text-base">{book.isbn}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase">Publication Year</div>
                <div className="font-bold text-white mt-1 text-sm sm:text-base">{book.year}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase">Total Campus Copies</div>
                <div className="font-bold text-white mt-1 text-sm sm:text-base">{book.totalCopies} Copies</div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2.5">
              <h3 className="text-sm uppercase tracking-wider text-white font-bold">
                Synopsis & Academic Scope
              </h3>
              <p className="text-sm sm:text-base font-sans text-white/85 leading-relaxed">
                {book.description}
              </p>
              <p className="text-sm sm:text-base font-sans text-white/75 leading-relaxed pt-2">
                This authoritative work is listed as core prescribed reading for undergraduate and postgraduate university examinations. Includes end-of-chapter algorithmic exercises, mathematical proofs, and industrial system architecture examples.
              </p>
            </div>

            {/* Table of Contents Sample */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="text-sm font-bold uppercase text-[#f5e2a4] flex items-center gap-2">
                <FileText size={16} />
                <span>Selected Curriculum Chapters</span>
              </div>
              <ul className="text-xs sm:text-sm font-sans text-white/75 space-y-1.5 list-disc pl-5">
                <li>Part I: Mathematical Foundations & Formal Abstractions</li>
                <li>Part II: Core Algorithms, Sorting & Complexity Analysis</li>
                <li>Part III: Advanced Data Structures & Memory Layout</li>
                <li>Part IV: Distributed Computations & Concurrent Optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Books */}
      {similarBooks.length > 0 && (
        <div>
          <h3 className="text-xl font-normal uppercase tracking-wider text-white mb-6">
            Related Titles in {book.category}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {similarBooks.map((sb) => (
              <BookCard key={sb.id} book={sb} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
