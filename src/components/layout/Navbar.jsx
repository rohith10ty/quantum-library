import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, CheckCircle2, X } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import gsap from 'gsap';

// Authentic Quantum University Central Library Emblem (Open Book + Quantum Orbit Ring)
const QuantumLibraryEmblem = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0 transition-transform duration-300 group-hover:scale-105`}
  >
    <rect
      x="2"
      y="2"
      width="44"
      height="44"
      rx="12"
      fill="#160a24"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeOpacity="0.4"
    />
    <ellipse
      cx="24"
      cy="24"
      rx="17"
      ry="6.5"
      transform="rotate(-28 24 24)"
      stroke="#ffffff"
      strokeWidth="1.2"
      strokeDasharray="2 3"
      opacity="0.8"
    />
    <ellipse
      cx="24"
      cy="24"
      rx="17"
      ry="6.5"
      transform="rotate(32 24 24)"
      stroke="#ffffff"
      strokeWidth="1"
      strokeOpacity="0.6"
    />
    <circle cx="24" cy="18" r="2" fill="#ffffff" />
    <path
      d="M24 22V34M24 22C21 19.5 14 19 10 20.5V32.5C14 31 21 31.5 24 34M24 22C27 19.5 34 19 38 20.5V32.5C34 31 27 31.5 24 34"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const { student, isLoggedIn, logout, notification } = useLibrary();

  // DOM Refs for Curved Physics Menu
  const menuRef = useRef(null);
  const curvePathRef = useRef(null);
  const linksRef = useRef([]);
  const indicatorsRef = useRef([]);

  // Navigation Links Dataset: Clean, properly sequenced
  const navLinks = [
    { num: '01', name: 'Home', sectionKey: 'home', path: '/' },
    { num: '02', name: 'Book Catalog', sectionKey: 'catalog', path: '/#search-section' },
    { num: '03', name: 'Categories', sectionKey: 'categories', path: '/#categories' },
    { num: '04', name: 'Services', sectionKey: 'services', path: '/#services' },
    { num: '05', name: 'Scholar Portal', sectionKey: 'login', path: isLoggedIn ? '/dashboard' : '/login' },
    { num: '06', name: 'About Library', sectionKey: 'about', path: '/#about' },
    { num: '07', name: 'Rules & Guidelines', sectionKey: 'rules', path: '/#rules' },
  ];

  // Scrollspy: detect active section on home page
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const sections = [
        { id: 'about', name: 'about' },
        { id: 'rules', name: 'rules' },
        { id: 'services', name: 'services' },
        { id: 'categories', name: 'categories' },
        { id: 'featured-books', name: 'featured' },
        { id: 'search-section', name: 'catalog' },
        { id: 'home', name: 'home' },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sec.name);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Curved Physics Paths
  const initialPath = (h = window.innerHeight) =>
    `M100 0 L200 0 L200 ${h} L100 ${h} Q-100 ${h / 2} 100 0`;

  const targetPath = (h = window.innerHeight) =>
    `M100 0 L200 0 L200 ${h} L100 ${h} Q100 ${h / 2} 100 0`;

  const getOffscreen = () => (menuRef.current?.offsetWidth || 480) + 120;

  // Mount setup: position menu offscreen initially
  useEffect(() => {
    const menu = menuRef.current;
    const curve = curvePathRef.current;
    if (!menu || !curve) return;

    const h = window.innerHeight;
    const offscreen = getOffscreen();
    gsap.set(menu, { x: offscreen });
    curve.setAttribute('d', initialPath(h));
  }, []);

  // Direct, Bulletproof GSAP Open/Close Animation (No timeline reset bugs)
  useEffect(() => {
    const menu = menuRef.current;
    const curve = curvePathRef.current;
    const links = linksRef.current.filter(Boolean);
    if (!menu || !curve) return;

    const h = window.innerHeight;
    const offscreen = getOffscreen();

    if (isOpen) {
      gsap.killTweensOf([menu, curve, ...links]);
      
      // 1. Slide panel in from offscreen
      gsap.fromTo(
        menu,
        { x: offscreen },
        { x: 0, duration: 0.75, ease: 'power3.inOut' }
      );

      // 2. Morph SVG curve from concave to convex physics bulge
      gsap.fromTo(
        curve,
        { attr: { d: initialPath(h) } },
        { attr: { d: targetPath(h) }, duration: 0.85, ease: 'power3.inOut' }
      );

      // 3. Stagger links into view
      gsap.fromTo(
        links,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, stagger: 0.035, delay: 0.12, ease: 'power2.out' }
      );

      // 4. Activate white dot indicator for active section
      setIndicator(activeSection);
    } else {
      gsap.killTweensOf([menu, curve, ...links]);
      
      // Slide panel back offscreen
      gsap.to(menu, { x: offscreen, duration: 0.6, ease: 'power3.inOut' });
      gsap.to(curve, {
        attr: { d: initialPath(h) },
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  // Set white dot indicator for hovered or active link
  const setIndicator = (targetKey) => {
    navLinks.forEach((link, idx) => {
      const dot = indicatorsRef.current[idx];
      if (dot) {
        gsap.to(dot, {
          scale: link.sectionKey === targetKey ? 1 : 0,
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    });
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle Link Navigation
  const handleNavClick = (link) => {
    closeMenu();
    setActiveSection(link.sectionKey);

    if (link.path.startsWith('/#')) {
      const id = link.path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.path === '/') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(link.path);
    }
  };

  const isLinkActive = (link) => {
    if (location.pathname === '/') {
      return activeSection === link.sectionKey;
    }
    return location.pathname === link.path;
  };

  return (
    <>
      {/* ======================================================== */}
      {/* FLOATING HEADER: Clean, No Background Bar, No Rectangle */}
      {/* ======================================================== */}
      <header className="fixed top-0 left-0 w-full z-40 p-4 sm:p-6 pointer-events-none select-none font-outfit">
        <div className="w-full flex items-center justify-between">
          
          {/* Left Side: Quantum University Logo & Emblem (Clickable) */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="pointer-events-auto flex items-center gap-3 group text-white shrink-0 transition-transform hover:scale-[1.02]"
          >
            <QuantumLibraryEmblem className="w-11 h-11" />
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2 leading-none whitespace-nowrap">
                <span className="font-outfit font-black text-2xl tracking-tight text-white drop-shadow-md">
                  Quantum
                </span>
                <span className="font-outfit font-bold text-xs uppercase tracking-[0.22em] text-white/90 drop-shadow-md">
                  University
                </span>
              </div>
              <div className="text-[10px] text-white/60 tracking-[0.25em] uppercase font-outfit mt-1 whitespace-nowrap drop-shadow-md">
                Central Library
              </div>
            </div>
          </Link>

          {/* Right Side: Profile Pill (Rohith Naidu) + Search + Circular Menu Button */}
          <div className="pointer-events-auto flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Quick Catalog Search */}
            <Link
              to="/catalog"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white shadow-xl hidden sm:flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
              title="Search Catalog"
            >
              <Search size={18} />
            </Link>

            {/* Student Profile Pill in a Single Line: Rohith Naidu */}
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 text-white transition-all shadow-xl whitespace-nowrap hover:scale-105"
                title="View Student Dashboard"
              >
                <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-xs font-black shrink-0">
                  RN
                </div>
                <span className="font-outfit text-sm font-semibold text-white whitespace-nowrap">
                  Rohith Naidu
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 text-xs text-white font-bold transition-all uppercase tracking-wider whitespace-nowrap shadow-xl hover:scale-105"
              >
                <User size={14} />
                <span>Scholar Login</span>
              </Link>
            )}

            {/* CURVED PHYSICS MENU TRIGGER: Solid White Circular Button */}
            <button
              onClick={toggleMenu}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white hover:bg-neutral-200 text-black shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-6 h-6 flex flex-col items-center justify-center relative pointer-events-none">
                <span
                  className={`block h-0.5 w-5 bg-black rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-black rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-[1px]' : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* CURVED PHYSICS MENU DRAWER (Audix #88 style)             */}
      {/* ======================================================== */}

      {/* Backdrop Dimmer */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9990] transition-opacity cursor-pointer"
        />
      )}

      {/* Slide-in Menu Panel */}
      <div
        ref={menuRef}
        data-lenis-prevent
        className="fixed top-0 right-0 h-screen w-[460px] max-w-[88vw] bg-[#140822] text-white z-[9999] flex flex-col shadow-[-25px_0_60px_rgba(0,0,0,0.9)] select-none"
        style={{ willChange: 'transform' }}
      >
        {/* Dynamic Curved SVG Morphing Edge on Left */}
        <svg
          className="absolute top-0 -left-[99px] w-[100px] h-full pointer-events-none"
          style={{ fill: '#140822', stroke: 'none' }}
        >
          <path ref={curvePathRef} />
        </svg>

        {/* Menu Inner Body: Fully Scrollable on Mouse Wheel & Touch */}
        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="h-full w-full p-6 sm:p-10 flex flex-col justify-between overflow-y-auto overscroll-contain scrollbar-none gap-6"
          style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
        >
          
          {/* Top Header Label */}
          <div className="border-b border-white/10 pb-4 flex items-center justify-between shrink-0">
            <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-mono">
              Quantum Library &bull; Navigation
            </span>
            <button
              onClick={closeMenu}
              className="text-white/60 hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer flex items-center gap-1"
            >
              <X size={14} />
              <span>Close</span>
            </button>
          </div>

          {/* Navigation Links with Hover White Dot Indicator */}
          <nav
            onMouseLeave={() => setIndicator(activeSection)}
            className="flex flex-col gap-3 py-2"
          >
            {navLinks.map((link, idx) => {
              const active = isLinkActive(link);
              return (
                <div
                  key={link.name}
                  ref={(el) => (linksRef.current[idx] = el)}
                  onMouseEnter={() => setIndicator(link.sectionKey)}
                  onClick={() => handleNavClick(link)}
                  className="relative flex items-center gap-3.5 cursor-pointer group py-1"
                >
                  {/* The Little White Dot Indicator (Dennis Snellenberg / Audix style) */}
                  <div
                    ref={(el) => (indicatorsRef.current[idx] = el)}
                    className="w-2.5 h-2.5 rounded-full bg-white absolute -left-6 sm:-left-7 scale-0 origin-center transition-transform"
                  />

                  {/* Number Prefix */}
                  <span className="text-xs font-mono text-white/30 group-hover:text-white/60 transition-colors w-5">
                    {link.num}
                  </span>

                  {/* Nav Link Text */}
                  <span
                    className={`font-outfit text-2xl sm:text-3xl font-light tracking-tight transition-colors ${
                      active
                        ? 'text-white font-bold'
                        : 'text-white/80 group-hover:text-white'
                    }`}
                  >
                    {link.name}
                  </span>

                  {/* Active / Borrowed Badge */}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-white text-black font-extrabold ml-auto">
                      {link.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Menu Drawer Footer: Member Status & Solid White Action Button */}
          <div className="border-t border-white/10 pt-6 mt-4 space-y-4 font-mono">
            {isLoggedIn ? (
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-black shrink-0">
                    RN
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white leading-tight">Rohith Naidu</span>
                    <span className="text-[10px] text-white/50">{student.degree}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogOut size={13} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
              >
                <User size={14} className="text-black" />
                <span>Student / Scholar Login</span>
              </Link>
            )}

            {/* University Hours & Desk Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-white/50 pt-1">
              <span>Open Mon-Sat &bull; 8:00 AM - 10:00 PM</span>
              <span className="text-white/70">Desk: ext. 4021</span>
            </div>

            {/* Quick Micro Links */}
            <div className="flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/5">
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick({ sectionKey: 'about', path: '/#about' }); }} className="hover:text-white transition-colors cursor-pointer">
                Archives
              </a>
              <a href="#rules" onClick={(e) => { e.preventDefault(); handleNavClick({ sectionKey: 'rules', path: '/#rules' }); }} className="hover:text-white transition-colors cursor-pointer">
                Guidelines
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick({ sectionKey: 'services', path: '/#services' }); }} className="hover:text-white transition-colors cursor-pointer">
                Computing Pods
              </a>
              <Link to="/catalog" onClick={closeMenu} className="hover:text-white transition-colors cursor-pointer">
                Full Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl bg-black/90 border border-white/20 shadow-2xl backdrop-blur-xl text-white font-mono text-xs animate-slideUp">
          <CheckCircle2 size={16} className={notification.type === 'error' ? 'text-red-400' : 'text-emerald-400'} />
          <span>{notification.message}</span>
        </div>
      )}
    </>
  );
};
