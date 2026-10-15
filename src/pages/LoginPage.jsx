import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, User, Lock, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useLibrary();

  const [role, setRole] = useState('student'); // 'student' | 'faculty' | 'scholar'
  const [memberId, setMemberId] = useState('QU-2024-042');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      id: memberId,
      name: role === 'faculty' ? 'Dr. Aris Vance' : 'Rohith Naidu',
      department: 'Computer Science & Engineering',
    });
    navigate('/dashboard');
  };

  const handleFillDemo = (type) => {
    if (type === 'student') {
      setRole('student');
      setMemberId('QU-2024-042');
      setPassword('scholarPass#2026');
    } else {
      setRole('faculty');
      setMemberId('FAC-AI-901');
      setPassword('profDeanKey#88');
    }
  };

  return (
    <div className="relative pt-24 pb-20 px-4 max-w-md mx-auto font-mono select-none min-h-screen flex flex-col justify-center">
      <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-[0_0_60px_rgba(196,113,225,0.2)] backdrop-blur-xl">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center mb-3.5">
            <BookOpen size={28} className="text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            Library Member Portal
          </h2>
          <p className="text-sm text-white/60 font-sans mt-1.5 leading-relaxed">
            Sign in with your University Scholar ID or College Email
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-white/5 border border-white/5 mb-6 text-xs sm:text-sm">
          {[
            { id: 'student', label: 'Student' },
            { id: 'faculty', label: 'Faculty' },
            { id: 'scholar', label: 'Scholar' },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`py-2 rounded-lg transition-all uppercase tracking-wider font-semibold ${
                role === r.id
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-sm uppercase tracking-wider text-white/80 mb-2 font-bold">
              Scholar ID or University Email
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              <input
                type="text"
                required
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="e.g. CS-2024-042"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm sm:text-base focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm uppercase tracking-wider text-white/80 font-bold">
                Password / PIN
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-white/70 hover:text-white hover:underline font-semibold">
                Forgot PIN?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm sm:text-base focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-1 text-xs sm:text-sm text-white/70 font-sans">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-white/20 text-white focus:ring-0 w-4 h-4"
            />
            <label htmlFor="remember">Keep me signed in on campus Wi-Fi</label>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-extrabold text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 mt-3 cursor-pointer"
          >
            <span>Authenticate & Enter Portal</span>
            <ArrowRight size={16} className="text-black" />
          </button>
        </form>

        {/* Demo Credentials Quick Fill Buttons */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <div className="text-xs uppercase tracking-wider text-white/50 mb-2.5 font-semibold">
            Instant Demo Credentials
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => handleFillDemo('student')}
              className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs sm:text-sm text-[#9df2eb] border border-white/10 transition-colors font-semibold"
            >
              Fill as Student
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('faculty')}
              className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs sm:text-sm text-[#c471e1] border border-white/10 transition-colors font-semibold"
            >
              Fill as Faculty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
