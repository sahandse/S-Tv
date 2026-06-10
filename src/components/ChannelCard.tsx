import type { Channel, Stream } from '../types';
import ChannelLogo from './ChannelLogo';

interface Props {
  channel: Channel;
  stream: Stream;
  logoUrl?: string;
  countryFlag?: string;
  onClick: () => void;
}

const QUALITY_BADGE: Record<string, string> = {
  '4k': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  '1080p': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  '720p': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  '480p': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
  'hd': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  'sd': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
};

function qualityClass(q: string | null) {
  if (!q) return '';
  return QUALITY_BADGE[q.toLowerCase()] ?? 'bg-zinc-700/40 text-zinc-300 border-zinc-600';
}

export default function ChannelCard({ channel, stream, logoUrl, countryFlag, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col gap-3 text-left transition-all duration-200 hover:bg-zinc-800 hover:border-violet-500/40 card-glow animate-fade-in"
    >
      {/* Play overlay */}
      <div className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-11 h-11 bg-violet-600/90 rounded-full flex items-center justify-center shadow-xl shadow-violet-900/50">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Logo + quality */}
      <div className="flex items-start justify-between gap-2">
        <ChannelLogo url={logoUrl} name={channel.name} className="w-12 h-12" />
        {stream.quality && (
          <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded border ${qualityClass(stream.quality)}`}>
            {stream.quality}
          </span>
        )}
      </div>

      {/* Channel name */}
      <div>
        <p className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-violet-200 transition-colors">
          {channel.name}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          {countryFlag && <span className="text-sm">{countryFlag}</span>}
          {channel.categories[0] && (
            <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded capitalize">
              {channel.categories[0]}
            </span>
          )}
        </div>
      </div>

      {/* Live badge */}
      <div className="absolute top-3 right-3">
        <span className="flex items-center gap-1 bg-red-500/15 border border-red-500/25 text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse-slow" />
          LIVE
        </span>
      </div>
    </button>
  );
}
