export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#08080e] flex flex-col items-center justify-center gap-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-900/60">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
          </svg>
        </div>
        <div>
          <div className="text-white font-black text-2xl tracking-tight">S‑TV</div>
          <div className="text-violet-400 text-xs font-medium">ماهواره زنده</div>
        </div>
      </div>

      {/* Loading */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-zinc-500 text-sm">در حال بارگذاری کانال‌ها…</p>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(139,92,246,0.06),transparent)]" />
    </div>
  );
}
