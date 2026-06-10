import { useEffect } from 'react';
import type { Channel, Stream } from '../types';
import VideoPlayer from './VideoPlayer';
import ChannelLogo from './ChannelLogo';

interface Props {
  channel: Channel;
  stream: Stream;
  logoUrl?: string;
  countryName?: string;
  countryFlag?: string;
  onClose: () => void;
}

export default function PlayerModal({
  channel,
  stream,
  logoUrl,
  countryName,
  countryFlag,
  onClose,
}: Props) {
  // Close on Escape key
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video */}
        <VideoPlayer url={stream.url} title={channel.name} />

        {/* Channel info */}
        <div className="p-4 flex items-start gap-4">
          <ChannelLogo url={logoUrl} name={channel.name} className="w-14 h-14 shrink-0" />

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white leading-tight">{channel.name}</h2>

            <div className="flex items-center flex-wrap gap-2 mt-1.5">
              {countryFlag && countryName && (
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                  <span>{countryFlag}</span>
                  <span>{countryName}</span>
                </span>
              )}
              {stream.quality && (
                <span className="text-[10px] font-semibold uppercase bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700">
                  {stream.quality}
                </span>
              )}
              {channel.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] capitalize bg-violet-500/10 border border-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded"
                >
                  {cat}
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
              className="shrink-0 text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2 whitespace-nowrap"
            >
              Website ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
