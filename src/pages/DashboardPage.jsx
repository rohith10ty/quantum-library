import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  BookOpen,
  Calendar,
  Clock,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export const DashboardPage = () => {
  const { student, returnBook, renewBook } = useLibrary();
  const [activeTab, setActiveTab] = useState('borrowed'); // 'borrowed' | 'history'

  const borrowedCount = student.borrowedBooks.length;
  const historyCount = student.readingHistory.length;

  return (
    <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono select-none min-h-screen">
      {/* Student Identity Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-md mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-xl shrink-0">
              RN
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active Scholar
                </span>
                <span className="text-xs sm:text-sm text-white/60 font-semibold">{student.id}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-wide">
                {student.name}
              </h1>
              <p className="text-sm text-[#9df2eb] font-sans mt-1 font-medium">
                {student.degree} &bull; {student.year}
              </p>
              <p className="text-xs text-white/50 mt-1">
                {student.email}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3.5 w-full md:w-auto text-center">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-white">{borrowedCount}</div>
              <div className="text-xs text-white/60 uppercase mt-1">Borrowed</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-[#9df2eb]">{historyCount}</div>
              <div className="text-xs text-white/60 uppercase mt-1">Completed</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">$0.00</div>
              <div className="text-xs text-white/60 uppercase mt-1">Fines</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('borrowed')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider transition-all font-semibold ${
            activeTab === 'borrowed'
              ? 'bg-[#9df2eb] text-black font-bold shadow-[0_0_15px_rgba(157,242,235,0.3)]'
              : 'text-white/70 hover:text-white bg-white/5'
          }`}
        >
          <BookOpen size={16} />
          <span>Currently Issued ({borrowedCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider transition-all font-semibold ${
            activeTab === 'history'
              ? 'bg-[#9df2eb] text-black font-bold shadow-[0_0_15px_rgba(157,242,235,0.3)]'
              : 'text-white/70 hover:text-white bg-white/5'
          }`}
        >
          <Clock size={16} />
          <span>Reading History ({historyCount})</span>
        </button>
      </div>

      {/* Tab 1: Currently Borrowed Books */}
      {activeTab === 'borrowed' && (
        <div className="space-y-6">
          {student.borrowedBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {student.borrowedBooks.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-22 h-32 object-cover rounded-xl border border-white/10 shrink-0"
                    />
                    <div className="space-y-1.5 overflow-hidden">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                        {item.daysLeft} Days Left
                      </span>
                      <h3 className="text-base font-bold text-white truncate pt-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/70 font-sans truncate">
                        {item.author}
                      </p>
                      <div className="pt-2 text-xs text-white/50 space-y-1">
                        <div>Borrowed: {item.borrowDate}</div>
                        <div className="text-[#f5e2a4] font-semibold">Due: {item.dueDate}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-white/10 grid grid-cols-2 gap-2.5 text-xs sm:text-sm font-semibold">
                    <button
                      onClick={() => renewBook(item.id)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Extend due date by 14 days"
                    >
                      <RotateCcw size={14} />
                      <span>Renew (+14d)</span>
                    </button>
                    <button
                      onClick={() => returnBook(item.id)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 transition-colors"
                    >
                      <CheckCircle size={14} />
                      <span>Return</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center rounded-3xl bg-white/[0.02] border border-white/10">
              <BookOpen size={36} className="mx-auto text-white/20 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No Active Borrowed Volumes</h3>
              <p className="text-xs text-white/50 font-sans mb-6">
                You have not checked out any books yet. Browse the catalog to issue print volumes.
              </p>
              <Link
                to="/catalog"
                className="px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md"
              >
                <span>Browse Catalog</span>
                <ArrowRight size={14} className="text-black" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Reading History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Completed Books & Return Archive
            </h3>

            <div className="space-y-3">
              {student.readingHistory.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={h.cover}
                      alt={h.title}
                      className="w-10 h-14 object-cover rounded-md border border-white/10"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{h.title}</div>
                      <div className="text-[11px] text-white/60 font-sans">{h.author}</div>
                      <div className="text-[10px] text-white/40 mt-0.5">
                        Returned on: {h.returnDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[#f5e2a4]">
                    {[...Array(h.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#f5e2a4]" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
