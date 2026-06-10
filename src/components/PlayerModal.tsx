import { useEffect } from 'react';
import type { Channel, Stream } from '../types';
import VideoPlayer from './VideoPlayer';
import ChannelLogo from './ChannelLogo';
import { FA_CATEGORIES } from './ChannelCard';

interface Props {
  channel: Channel;
  stream: Stream;
  logoUrl?: string;
  countryName?: string;
  countryFlag?: string;
  onClose: () => void;
}

const QUALITY_LABELS: Record<string, string> = {
  '4k': '4K', '1080p': '1080p', '720p': '720p', 'hd': 'HD', 'sd': 'SD',
};

export default function PlayerModal({ channel, stream, logoUrl, countryName, countryFlag, onClose }: Props) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const quality = stream.quality ? QUALITY_LABELS[stream.quality.toLowerCase()] ?? stream.quality.toUpperCase() : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl bg-[#111118] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 animate-slide-up">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-20 w-8 h-8 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          aria-label="بستن"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
            <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Player */}
        <VideoPlayer url={stream.url} title={channel.name} />

        {/* Info bar */}
        <div className="p-4 flex items-start gap-3">
          <ChannelLogo url={logoUrl} name={channel.name} className="w-14 h-14 shrink-0 rounded-xl" />

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-white leading-snug">{channel.name}</h2>

            <div className="flex items-center flex-wrap gap-2 mt-2">
              {countryFlag && countryName && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
                  <span>{countryFlag}</span><span>{countryName}</span>
                </span>
              )}
              {quality && (
                <span className="text-[10px] font-bold bg-violet-500/15 border border-violet-500/25 text-violet-300 px-2 py-0.5 rounded-full">
                  {quality}
                </span>
              )}
              {channel.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full"
                >
                  {FA_CATEGORIES[cat] ?? cat}
                </span>
              ))}
            </div>

            {stream.title && stream.title !== channel.name && (
              <p className="text-xs text-zinc-500 mt-1.5 line-clamp-1">{stream.title}</p>
            )}
          </div>

          {channel.website && (
            <a
              href={channel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2 whitespace-nowrap mt-1"
            >
              وبسایت ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
