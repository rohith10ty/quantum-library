import React, { useState } from 'react';
import { X, Bookmark, Calendar, Clock, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

export const IssueBookModal = () => {
  const { selectedBookForIssue, closeIssueModal, issueBook, student } = useLibrary();
  const [duration, setDuration] = useState(14);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedBookForIssue) return null;

  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + duration);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      issueBook(selectedBookForIssue.id, duration);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div
      onClick={closeIssueModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 font-mono"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl bg-black/90 border border-white/20 p-6 md:p-8 shadow-[0_0_60px_rgba(196,113,225,0.3)] text-white"
      >
        <button
          onClick={closeIssueModal}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9df2eb] mb-2 font-bold">
          <Bookmark size={16} />
          <span>Library Circulation Desk</span>
        </div>

        <h3 className="text-2xl font-bold uppercase mb-4 text-white">
          Issue Book Request
        </h3>

        {/* Selected Book Summary Card */}
        <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-6 items-center">
          <img
            src={selectedBookForIssue.cover}
            alt={selectedBookForIssue.title}
            className="w-16 h-22 object-cover rounded-lg border border-white/10 shrink-0"
          />
          <div className="space-y-1 overflow-hidden">
            <span className="text-xs px-2.5 py-0.5 rounded bg-white/10 text-[#d09df2] uppercase font-bold">
              {selectedBookForIssue.category}
            </span>
            <div className="text-base font-bold text-white truncate">
              {selectedBookForIssue.title}
            </div>
            <div className="text-sm text-white/70 font-sans truncate">
              {selectedBookForIssue.author}
            </div>
            <div className="text-xs text-white/50">
              {selectedBookForIssue.shelf}
            </div>
          </div>
        </div>

        {/* Member Details */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-sm font-sans">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-white/50 font-mono text-xs">Student Scholar</div>
            <div className="font-bold text-white mt-1 text-sm">{student.name}</div>
            <div className="text-white/60 text-xs font-mono">{student.id}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-white/50 font-mono text-xs">Pickup Counter</div>
            <div className="font-bold text-[#9df2eb] mt-1 text-sm">Desk 02 (Ground Floor)</div>
            <div className="text-white/60 text-xs font-mono">Central Library</div>
          </div>
        </div>

        {/* Duration Selection */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider text-white/80 mb-2 font-bold">
            Select Borrowing Period
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[7, 14, 21].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setDuration(days)}
                className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition-all ${
                  duration === days
                    ? 'border-[#9df2eb] bg-[#9df2eb]/15 text-[#9df2eb] shadow-[0_0_12px_rgba(157,242,235,0.2)]'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {days} Days
                {days === 14 && <span className="block text-xs font-normal opacity-70">Standard</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date Indicator */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm mb-6 text-emerald-300">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Return Due Date:</span>
          </div>
          <span className="font-bold font-mono">
            {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Confirm / Cancel Buttons */}
        <div className="flex gap-3">
          <button
            onClick={closeIssueModal}
            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs sm:text-sm uppercase tracking-wider text-white/70 hover:text-white transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Issue'}
          </button>
        </div>
      </div>
    </div>
  );
};
