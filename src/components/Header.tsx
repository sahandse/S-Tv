import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useIPTV } from '../context/IPTVContext';

export default function Header() {
  const { pathname } = useLocation();
  const { channels } = useIPTV();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { to: '/', label: 'خانه' },
    { to: '/countries', label: 'کشورها' },
    { to: '/genres', label: 'ژانرها' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#08080e]/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 select-none">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg shadow-violet-900/50">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-base tracking-tight">S‑TV</span>
            <span className="text-violet-400 text-[9px] font-medium">ماهواره زنده</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-1 mr-2">
          {nav.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname === link.to
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mr-auto flex items-center gap-3">
          {/* Live count */}
          {channels.length > 0 && (
            <div className="hidden md:flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              {channels.length.toLocaleString('fa-IR')} کانال زنده
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-zinc-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              {menuOpen
                ? <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
                : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/5 bg-[#0d0d18] px-4 py-3 flex flex-col gap-1">
          {nav.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                pathname === link.to
                  ? 'bg-violet-600/20 text-violet-300'
                  : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
